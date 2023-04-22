import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {MaterialRecipeDictionary} from "@/utils/entities/Material/Recipes/MaterialRecipeDictionary";
import {CurrentProductionStep} from "@/utils/entities/Material/Recipes/ProductionStep";
import _ from "lodash";

export class RecipeStepTree implements CurrentProductionStep {
    /** Steps after this one */
    public childrenSteps: RecipeStepTree[] = [];
    /** Material required at the root of the tree to get to this node */
    requireMaterials: MaterialInventory;
    public finalInventory: MaterialInventory;
    inventory: MaterialInventory;
    recipeCollection: MaterialRecipeDictionary;
    parentStep: RecipeStepTree | undefined;
    recipeUsed: MaterialRecipe | undefined;
    public step: number = 1;

    constructor(finalInventory: MaterialInventory, listOfPossibleRecipes: MaterialRecipeDictionary, inventory: MaterialInventory, cost: MaterialInventory | undefined = undefined, recipeUsed: MaterialRecipe | undefined = undefined, previousStep: RecipeStepTree | undefined = undefined, step: number = 1) {
        this.step = step;
        this.finalInventory = finalInventory;
        this.parentStep = previousStep;
        this.recipeUsed = recipeUsed;
        this.inventory = inventory;
        this.requireMaterials = cost !== undefined ? cost : new MaterialInventory().addToInventory(finalInventory.deepClone());
        this.recipeCollection = listOfPossibleRecipes;
    }

    /** Return all the recipes for the materials currently in the requirement array */
    public getRecipesOfRequiredMaterials(): MaterialRecipeDictionary {
        return this.recipeCollection.getAllRecipesForMaterials(this.requireMaterials.getNonNullMaterials().toKeyArray())
    }

    get hasACompletedChildNested() {
        if (this.isCompleted) { return true; }
        for (const childrenStep of this.childrenSteps) {
            if (childrenStep.hasACompletedChildNested) {return true;}
        }

        return false;
    }

    get hasACompletedChildren() {
        for (const childrenStep of this.childrenSteps) {
            if (childrenStep.isCompleted) {return true;}
        }

        return false;
    }

    get isCompleted(): boolean {
        return this.inventory.isEachMaterialSuperiorOrEdualTo(this.finalInventory.getNonNullMaterials());
    }

    get isWorseThanParentsBest(): boolean {
        return false;
    }

    public addChildren(recipe: MaterialRecipe) {
        // You need to be able to use the recipe
        //if (!recipe.hasEnoughToProduce(this.inventory)) {return;}

        // If there is already a children with a completion, prevent creating more intermediary materials
        //if(this.hasACompletedChildren && !this.recipeProduceEndMaterial(recipe)) {return;}

        // Then add the children
        const childrenValue = recipe.produceOne(this.inventory.deepClone(), this.requireMaterials.deepClone(), true);
        if (childrenValue === undefined) {return;}

        const children: RecipeStepTree = new RecipeStepTree(this.finalInventory, this.recipeCollection, childrenValue.inventory, childrenValue.requireMaterials, recipe, this, this.step + 1);

        if (children.isWorseThanParentsBest) {return;}
        if (!children.isCompleted) {children.generateChildren();}
        this.childrenSteps.push(children);
    }

    public areAllChildrenCompleted() {
        if (this.isCompleted) {return true;}
        for (const childrenStep of this.childrenSteps) {
            if (!childrenStep.areAllChildrenCompleted()) {return false;}
        }
        return true;
    }

    public generateChildren() {
        // If the nesting is too high, just stop
        if (this.step === 100) {return;}

        /* // If the current step is worse than other steps, then stop the nesting
        //if (this.parentStep !== undefined && this.isWorseThanOneInCollection(this.parentStep.getBestCompletedChildren())) {return;}

        // First try to do the end materials
        const endMaterialRecipes: MaterialRecipe[] = this.getEndMaterialRecipes();
        for (const endMaterialRecipe of endMaterialRecipes) {
            this.addChildren(endMaterialRecipe);
        }

        // Then, if all children aren't completed, add some intermediary materials
        if (!this.hasACompletedChildNested) {
            for (const possibleRecipe of this.recipeCollection) {
                this.addChildren(possibleRecipe);
            }
        } */

        const materialRecipes: MaterialRecipe[] = this.getRecipesOfRequiredMaterials().recipes;
        for (const recipesOfRequiredMaterial of materialRecipes) {
            this.addChildren(recipesOfRequiredMaterial)
        }
    }

    public getBestCompletedChildren(): RecipeStepTree[] {
        if (this.isCompleted) {return [this];}

        const bestCompletedChildren: RecipeStepTree[] = [];
        for (const childrenStep of this.childrenSteps) {
            bestCompletedChildren.push(...childrenStep.getCompletedNestedChildren());
        }

        for (let i = 0; i < bestCompletedChildren.length; i++) {
            const currentChild: RecipeStepTree | undefined = bestCompletedChildren.at(i);
            if (currentChild === undefined) {continue;}

            if (currentChild.isWorseThanOneInCollection(bestCompletedChildren)) {
                _.pull(bestCompletedChildren, currentChild);
            }
        }

        return bestCompletedChildren;
    }

    public getBestCompletedChildrenOfTree(): RecipeStepTree[] {
        // First, get the root
        if (this.parentStep !== undefined) {return this.parentStep.getBestCompletedChildrenOfTree();}

        // Now that we are on the root, get the best children
        return this.getBestCompletedChildren();
    }

    public getCompletedNestedChildren(): RecipeStepTree[] {
        if (this.isCompleted) {return [this];}

        const endNodes: RecipeStepTree[] = [];
        for (const childrenStep of this.childrenSteps) {
            endNodes.push(...childrenStep.getCompletedNestedChildren());
        }
        return endNodes;
    }

    public getEndMaterialRecipes() {
        return this.recipeCollection.filter(value => this.recipeProduceEndMaterial(value));
    }

    public getIntermediateMaterialRecipes() {
        return this.recipeCollection.filter(value => !this.recipeProduceEndMaterial(value));
    }

    public getPossibleRecipeChainEnds(): CurrentProductionStep[] {
        if (this.isCompleted) {
            return [{recipe: this.recipeUsed, requireMaterials: this.requireMaterials, inventory: this.inventory}];
        }
        const ends = [];

        for (const childrenStep of this.childrenSteps) {
            ends.push(...childrenStep.getPossibleRecipeChainEnds());
        }

        return ends;
    }

    public isWorseThan(otherStep: RecipeStepTree): boolean {
        // If the cost for all the materials is already more than a completed chain, then the chain should stop
        if (otherStep.isCompleted && this.requireMaterials.isEachMaterialSuperiorOrEdualTo(otherStep.requireMaterials)) { return true; }

        // If there's less rewards for the same cost, then don't bother
        if (otherStep.isCompleted && this.isCompleted && otherStep.inventory.isEachMaterialSuperiorOrEdualTo(this.inventory)) { return true; }

        return false;
    }

    public isWorseThanOneInCollection(otherSteps: RecipeStepTree[]): boolean {
        for (const otherStep of otherSteps) {
            if (this.isWorseThan(otherStep)) {return true;}
        }
        return false;
    }

    public recipeProduceEndMaterial(recipe: MaterialRecipe) {
        for (const idMaterialNeeded of this.finalInventory.getNonNullMaterialIds()) {
            if (recipe.canProduceMaterial(idMaterialNeeded)) { return true;}
        }
        return false;
    }

    /** Return all the material ids used by the recipe that are also in the final inventory. */
    private getFinalMaterialsUsedByRecipe(recipe: MaterialRecipe) {
        const matsUsed = [];
        for (const idMaterial of recipe.materialsRequired.toKeyArray()) {
            if (this.finalInventory.get(idMaterial).quantity > 0) {matsUsed.push(idMaterial);}
        }
        return matsUsed;
    }

    private getRemainingMaterialToCraft(): MaterialInventory {
        return this.finalInventory.deepClone().removeFromInventory(this.inventory).removeNegativeOrZero();
    }

    /** Return true if there is a recipe able to craft one of the remaining materials without having to craft secondary materials first */
    private isAbleToCreateRemainingMaterialDirectly(): boolean {
        for (const listOfPossibleRecipe of this.recipeCollection) {
            if (listOfPossibleRecipe.recipeCanCraftOneOfTheItems(this.getRemainingMaterialToCraft())) {return true;}
        }
        return false;
    }
}

export class RecipeStepTreeCollection {
    collection: RecipeStepTree[] = [];

    public getBestChildren(): RecipeStepTree[] {

    };

    public getStepsWithLowestItemInCost(idMaterial: string): RecipeStepTreeCollection {
        let lowestCount = this.getLowestCountOfMaterial(idMaterial);


    }


    private getBestOfTwoChildrens(child1: RecipeStepTree, child2: RecipeStepTree) {

    }

    private getLowestCountOfMaterial(idMaterial: string) {
        let lowest: number | undefined;

        for (const steps of this.collection) {
            const quantity = steps.requireMaterials.get(idMaterial).quantity;
            if (lowest === undefined || lowest < quantity) {
                lowest = quantity;
            }
        }

        return lowest;
    }
}