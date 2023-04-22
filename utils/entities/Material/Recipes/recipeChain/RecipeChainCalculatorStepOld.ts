import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {RecipeChain} from "@/utils/entities/Material/Recipes/recipeChain/RecipeChain";
import {MaterialRecipeDictionary} from "@/utils/entities/Material/Recipes/MaterialRecipeDictionary";
import {RecipeChainCalculatorCollection} from "@/utils/entities/Material/Recipes/RecipeChainCalculatorCollection";
import {InferiorBecause} from "@/utils/entities/Material/Recipes/recipeChain/InferiorBecause";
import {InferiorTo} from "@/utils/entities/Material/Recipes/recipeChain/InferiorTo";

export class RecipeChainCalculatorStepOld {
    public children: RecipeChain[] = [];
    public inferiorTo: InferiorTo | undefined;
    public inventoryToReduce: MaterialInventory;
    public recipeCollection: MaterialRecipeDictionary;
    public recipesApplied: RecipeChain;
    public stepCollection: RecipeChainCalculatorCollection;
    //private _PrimaryMaterials: MaterialInventory;
    //private _FinalMaterials: MaterialInventory;

    constructor(recipeApplied: RecipeChain, recipeAvailable: MaterialRecipeDictionary, baseInventory: MaterialInventory, stepCollection: RecipeChainCalculatorCollection) {
        this.recipesApplied = recipeApplied;
        this.recipeCollection = recipeAvailable;
        this.inventoryToReduce = this.recipesApplied.unCraftInventory(baseInventory.deepClone());
        this.stepCollection = stepCollection
    }

    get id(): string {
        return this.recipesApplied.id;
    }

    /** True if the step only have primary materials */
    get isCompletedChain(): boolean {
        return this.getRecipesAvailable().size === 0;
    }

    /** True if the step has no point of being explored further */
    get isEnded(): boolean {
        return this.isInferior || this.isCompletedChain;
    }

    get isInferior() {
        return this.inferiorTo !== undefined;
    }

    /** True if the current step can make children and isn't ended*/
    get isPending() {
        return (this.children === undefined || this.children.length === 0) && !this.isEnded;
    }

    get stepCount() {
        return this.recipesApplied.size;
    }

    public debug_LogRemovalReason() {
        if (this.inferiorTo === undefined) {
            return
        }

        switch (this.inferiorTo.reason) {
            case "More primary material":
                console.log("Removing: ", this.id, ", inferior to:", this.inferiorTo.step.id, " | More primary material")
                console.log("          ", this.getInventoryPrimaryMaterials().toIdQuantityMap().toJSON(), " - vs - ", this.inferiorTo.step.getInventoryPrimaryMaterials().toIdQuantityMap().toJSON())
                return;

            case "More steps for same inventory":
                console.log("Removing: ", this.id, ", inferior to:", this.inferiorTo.step.id, " | More steps for same inventory")
                console.log("          ", this.recipesApplied.size, " - vs - ", this.inferiorTo.step.recipesApplied.size)
                return;
        }
    }

    public debug_logs() {
        console.log("Id: ", this.id);
        console.log("Recipes:", this.recipesApplied.toIDQuantityDictionary().toJSON())
        console.log("Primary materials:", this.getInventoryPrimaryMaterials().toIdQuantityMap().toJSON())
        console.log("Extra Materials:") //TODO
    }

    getChildrenSteps(): RecipeChain[] {
        if (this.isEnded) {return [];}
        const recipes = this.getRecipesAvailable();

        this.children = recipes.map((recipe: MaterialRecipe) => {
            return this.recipesApplied.deepClone().push(recipe);
        });

        return this.children;
    }

    public getInventoryPrimaryMaterials() {
        return this.inventoryToReduce.deepClone().filterKeys(this.recipeCollection.getPrimaryMaterials());
    }

    getRecipesAvailable() {
        return this.recipeCollection.getRecipesForInventory(this.inventoryToReduce.getNonNullMaterials());
    }

    public hasMorePrimaryMaterialThanCompletedStep(otherStep: RecipeChainCalculatorStepOld) {
        if (!otherStep.isCompletedChain) {return false;}
        const thisPrimaryMats = this.getInventoryPrimaryMaterials();
        const otherPrimaryMat = otherStep.getInventoryPrimaryMaterials();
        const hasMoreOrEqualNumberOfMaterials = thisPrimaryMats.isEachMaterialSuperiorOrEdualTo(otherPrimaryMat);
        return hasMoreOrEqualNumberOfMaterials && !thisPrimaryMats.isEqual(otherPrimaryMat);
    }

    /** Return true if the current step take more step to have the same inventory as the one compared to */
    hasMoreStepsForSameInventory(otherStep: RecipeChainCalculatorStepOld) {
        if (this.stepCount <= otherStep.stepCount) {
            return false;
        }
        return this.hasSameInventory(otherStep);
    }

    hasMoreStepsForSameInventoryAsOne(steps: RecipeChainCalculatorStepOld[]) {
        for (const step of steps) {
            if (this.hasMoreStepsForSameInventory(step)) {
                return true;
            }
        }
        return false;
    }

    public hasMoreStepsForSamePrimaryMats(otherStep: RecipeChainCalculatorStepOld) {
        if (!this.isCompletedChain) {return false;}
        if (!otherStep.isCompletedChain) {return false;}
        if (otherStep.stepCount >= this.stepCount) {return false;}

        return this.getInventoryPrimaryMaterials().isEqual(otherStep.getInventoryPrimaryMaterials())
    }

    /** Return true if this step has the same inventory as another */
    hasSameInventory(otherStep: RecipeChainCalculatorStepOld) {
        return this.inventoryToReduce.isEqual(otherStep.inventoryToReduce);
    }

    isInferiorThan(step: RecipeChainCalculatorStepOld): "" | InferiorBecause {
        if (this.id === step.id) {return "";}

        // The step is worse if:
        // - It takes more steps to have the same inventory
        if (this.hasMoreStepsForSameInventory(step)) {
            return "More steps for same inventory";
        }

        // - Has more primary materials than an completed step.
        if (this.hasMorePrimaryMaterialThanCompletedStep(step)) {
            return "More primary material";
        }

        // - Has more steps but require the same primary materials
        if (this.hasMoreStepsForSamePrimaryMats(step)) {
            return "More steps for same inventory";
        }

        // - Has less final materials as a completed step than another completed step. //TODO
        return "";
    }

    public setInferiorStep() {
        if (this.inferiorTo !== undefined) {
            return true;
        }
        for (const step of this.stepCollection.toValueArray()) {
            const inferiorBecause = this.isInferiorThan(step);

            if (inferiorBecause !== "") {
                this.inferiorTo = {step: step, reason: inferiorBecause}
                this.debug_LogRemovalReason()
                return true
            }
        }
        return false
    }

    toString() {
        return `Recipes: ${this.recipesApplied.toIDQuantityDictionary().toJSON()}, For: ${this.inventoryToReduce.toIdQuantityMap().toJSON()}`;
    }
}

