import {MaterialQuantityType} from "@/utils/entities/Material/MaterialQuantity";
import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {MaterialRecipe} from "@/utils/entities/Material/Recipes/MaterialRecipe";
import {ProductionStep, ProductionStepType} from "@/utils/entities/Material/Recipes/ProductionStep";

export class MaterialRecipeCollection {
    recipes: MaterialRecipe[] = [];

    constructor(recipes: MaterialRecipe[]) {
        this.recipes = recipes;
    }

    public addProductionStep(currentStep: ProductionStep): ProductionStep[] {
        const possibleProductions = this.produceOneForEachRecipe(currentStep.current.inventory, currentStep.current.cost);


        return possibleProductions.map((value) => {
            return new ProductionStep(value.current, currentStep);
        });
    }

    /* produceOneBests(currentInventory: MaterialInventory, filtersLeastCostOf: string[] = []): RecipeProduction {
        const possibleProductions = _.cloneDeep(this.produceOne(currentInventory.clone()));

        for (const idMaterial of filtersLeastOf) {
            for (const possibleProduction of possibleProductions) {
                possibleProductions.filter(value => value.recipe.materialsRequired.get(idMaterial).quantity = <possibleProduction.recipe.materialsRequired.get(idMaterial)
            }
        }
    } */

    public produceToMatchInventory(currentInventory: MaterialInventory, finalInventory: MaterialInventory) {
        let oldStepList = [];
        let currentStepList = [new ProductionStep({inventory: currentInventory, cost: new MaterialInventory()})];

        for (const idMaterial of finalInventory.toKeyArray()) {
            oldStepList = currentStepList;
            currentStepList = [];

            for (const productionStep of oldStepList) {
                currentStepList.push(...this.produceToMatchQuantity(productionStep, finalInventory.get(idMaterial)));
            }
        }

        return currentStepList;
    }

    /* getBestRecipes(filtersLeastCostOf: string[] = []): MaterialRecipe[] {
        const bestRecipes = this.recipes.clo;

        for (const idMaterial of filtersLeastCostOf) {
            const bestMaterialCount;
        }
    }
 */
    produceToMatchQuantity(currentStep: ProductionStep, targetQuantity: MaterialQuantityType) {
        let oldStepList = [];
        let currentStepList = [currentStep];

        while (!this.AllStepsHaveReachedTarget(currentStepList, targetQuantity)) {
            oldStepList = currentStepList;
            currentStepList = [];

            for (const productionStep of oldStepList) {
                if (productionStep.hasStepReachedQuantity(targetQuantity)) {continue;}

                currentStepList.push(...this.addProductionStep(productionStep));
            }
        }

        return currentStepList;
    }

    public AllStepsHaveReachedTarget(steps: ProductionStep[], targetQuantity: MaterialQuantityType) {
        for (const step of steps) {
            if (!step.hasStepReachedQuantity(targetQuantity)) {return false;}
        }

        return true;
    }

    produceOneForEachRecipe(currentInventory: MaterialInventory, currentCost: MaterialInventory = new MaterialInventory()): ProductionStepType[] {
        const recipes = this.recipes.map(value => {
            return value.produceOne(currentInventory.clone(), currentCost.clone());
        });

        const filteredRecipes: ProductionStepType[] = [];

        for (const recipe of recipes) {
            if (recipe === undefined) {continue;}
            filteredRecipes.push(recipe);
        }

        return filteredRecipes;
    }
}