import {Dictionary} from "@/utils/classes/Dictionary";
import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {MaterialRecipe} from "@/utils/entities/Material/Recipes/MaterialRecipe";
import {MaterialRecipeCollection} from "@/utils/entities/Material/Recipes/MaterialRecipeCollection";
import _ from "lodash";

export class RecipePathManager {
    public completedPaths: RecipePath[] = [];
    public pendingPaths: RecipePath[] = [];

    public static getManager(materialsToReduce: MaterialInventory, recipeAvailable: MaterialRecipeCollection): RecipePathManager {
        const recipePathManager: RecipePathManager = new RecipePathManager();
        recipePathManager.pendingPaths.push(new RecipePath([], recipeAvailable, materialsToReduce.clone(), recipePathManager));
        return recipePathManager;
    }

    addStepToPendingPaths() {
        const newPath: RecipePath[] = [];
        for (const recipePath of this.pendingPaths) {
            this.handleStep(recipePath, newPath);
        }
        this.pendingPaths = [];
        this.pendingPaths = _.clone(newPath);
    }

    reduceAll() {
        while (this.pendingPaths.length > 0) {
            this.addStepToPendingPaths();
            this.pruneCompletedPaths();
        }
    }

    reduceFirstPending() {
        const firstPendingStep = this.pendingPaths[0];
        if (firstPendingStep === undefined) {return;}

        const generatedSteps = firstPendingStep.getNextSteps();

        for (const nextStep of generatedSteps) {
            if (nextStep.isWorseThanOneInCollection(this.completedPaths)) { continue; }
            if (nextStep.isWorseThanOneInCollection(newPath)) { continue; }
            if (nextStep.isSameMaterialToReduceAsOne(this.completedPaths)) { continue; }
            if (nextStep.isSameMaterialToReduceAsOne(newPath)) { continue; }
            if (nextStep.isCompleted) {
                this.completedPaths.push(nextStep);
                continue;
            }
            newPath.push(nextStep);
        }
    }

    private filterSteps(steps: RecipePath[]) {
        const filteredSteps: RecipePath[] = [];
        for (const step of steps) {
            if (step.isWorseThanOneInCollection(filteredSteps)) { continue; }
            if (step.isSameMaterialToReduceAsOne(filteredSteps)) { continue; }
            filteredSteps.push(step);
        }
        return filteredSteps;
    }

    private handleStep(recipePath: RecipePath, newPath: RecipePath[]): void {
        const generatedSteps = recipePath.getNextSteps();

        for (const nextStep of generatedSteps) {
            if (nextStep.isWorseThanOneInCollection(this.completedPaths)) { continue; }
            if (nextStep.isWorseThanOneInCollection(newPath)) { continue; }
            if (nextStep.isSameMaterialToReduceAsOne(this.completedPaths)) { continue; }
            if (nextStep.isSameMaterialToReduceAsOne(newPath)) { continue; }
            if (nextStep.isCompleted) {
                this.completedPaths.push(nextStep);
                continue;
            }
            newPath.push(nextStep);
        }
    }

    private pruneCompletedPaths() {
        const newCompletedPathsArray: RecipePath[] = [];
        for (const completedPath of this.completedPaths) {
            if (completedPath.isWorseThanOneInCollection(this.completedPaths)) {continue;}
            if (completedPath.isSameMaterialToReduceAsOne(newCompletedPathsArray)) { continue; }
            newCompletedPathsArray.push(completedPath);
        }

        this.completedPaths = _.clone(newCompletedPathsArray);
    }
}

export class RecipePath {
    public manager: RecipePathManager;
    public materialsToReduce: MaterialInventory;
    public recipeCollection: MaterialRecipeCollection;
    public recipesApplied: MaterialRecipe[];

    constructor(recipeApplied: MaterialRecipe[], recipeAvailable: MaterialRecipeCollection, materialsToReduce: MaterialInventory, manager: RecipePathManager) {
        this.recipesApplied = recipeApplied;
        this.recipeCollection = recipeAvailable;
        this.materialsToReduce = materialsToReduce;
        this.manager = manager;
    }

    get isCompleted(): boolean {
        return this.getRecipeAvailable().recipes.length === 0;
    }

    public addStep(recipe: MaterialRecipe): RecipePath {
        const appliedRecipes: MaterialRecipe[] = _.clone(this.recipesApplied);
        appliedRecipes.push(recipe);

        return new RecipePath(
            appliedRecipes,
            this.recipeCollection,
            recipe.unCraft(this.materialsToReduce.clone()),
            this.manager
        );
    }

    getChainStartingStock(): MaterialInventory {
        return this.materialsToReduce.getMaterialWithPositiveCounts();
    }

    getNextSteps(): RecipePath[] {
        const recipes = this.getRecipeAvailable();

        return recipes.recipes.map((recipe: MaterialRecipe) => {return this.addStep(recipe);});
    }

    getQuantityOfEachRecipe() {
        const recipeMap = new Dictionary<string, number>();

        for (const materialRecipe of this.getRecipesAppliedNames()) {
            recipeMap.set(materialRecipe, this.getQuantityOfRecipe(materialRecipe));
        }

        return recipeMap;
    }

    getQuantityOfRecipe(recipeName: string) {
        let count = 0;
        for (const materialRecipe of this.recipesApplied) {
            if (materialRecipe.name === recipeName) { count += 1;}
        }
        return count;
    }

    getRecipeAvailable(): MaterialRecipeCollection {
        return this.recipeCollection.getAllRecipesForMaterials(this.materialsToReduce.getNonNullMaterials().toKeyArray());
    }

    getRecipesAppliedNames() {
        const nameList: string[] = [];
        for (const materialRecipe of this.recipesApplied) {
            if (!nameList.includes(materialRecipe.name)) {nameList.push(materialRecipe.name);}
        }
        return nameList;
    }

    isSameAppliedRecipes(step: RecipePath) {
        return this.getQuantityOfEachRecipe().isSame(step.getQuantityOfEachRecipe());
    }

    isSameAppliedRecipesAsOne(steps: RecipePath[]) {
        for (const step of steps) {
            if (this.isSameAppliedRecipes(step)) { return true; }
        }
        return false;
    }

    isSameMaterialToReduceAsOne(steps: RecipePath[]) {
        for (const step of steps) {
            if (this.isSameMaterialsToReduce(step)) { return true; }
        }
        return false;
    }

    isSameMaterialsToReduce(step: RecipePath) {
        return this.materialsToReduce.isSame(step.materialsToReduce);
    }

    isWorseThan(step: RecipePath) {
        const thisStartngStock: MaterialInventory = this.getChainStartingStock();
        const stepStartingStock: MaterialInventory = step.getChainStartingStock();
        if (thisStartngStock.isSame(stepStartingStock)) {return false;}
        return thisStartngStock.hasMoreOfEachMaterialsThan(stepStartingStock);
    }

    isWorseThanOneInCollection(steps: RecipePath[]) {
        for (const step of steps) {
            if (this.isWorseThan(step)) {return true;}
        }
        return false;
    }
}

export class RecipePathCollection {
    collection: RecipePath[] = [];

    constructor(collection: RecipePath[] = []) {
        this.collection = collection;
    }

    public push(...steps: RecipePath[]){
        this.collection.push(...steps);
        this.cleanup()
    }

    public cleanup() {
        this.removeWorstLogs();
        this.removeDuplicateAppliedRecipes();
        this.removeDuplicateCurrentInventory();
    }

    removeDuplicateAppliedRecipes() {
        const newCollection = [];

        for (const recipePath of this.collection) {
            if (recipePath.isSameAppliedRecipesAsOne(newCollection)) {continue;}
            newCollection.push(recipePath);
        }

        this.collection = newCollection;
    }

    removeDuplicateCurrentInventory() {
            const newCollection = [];

            for (const recipePath of this.collection) {
                if (recipePath.isSameMaterialToReduceAsOne(newCollection)) {continue;}
                newCollection.push(recipePath);
            }

            this.collection = newCollection;
        }

    removeWorstLogs() {
        const newCollection = [];

        for (const recipePath of this.collection) {
            if (recipePath.isWorseThanOneInCollection(this.collection)) {continue;}
            newCollection.push(recipePath);
        }

        this.collection = newCollection;
    }
}

