import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {RecipeChain} from "@/utils/entities/Material/Recipes/recipeChain/RecipeChain";
import {MaterialRecipeDictionary} from "@/utils/entities/Material/Recipes/MaterialRecipeDictionary";
import {RecipeChainCalculatorCollection} from "@/utils/entities/Material/Recipes/RecipeChainCalculatorCollection";
import {Dictionary} from "@/utils/classes/Dictionary";
import {toPascalCase} from "@/utils/functions/ToPascalCase";
import {RecipeChainCalculatorStepOld} from "@/utils/entities/Material/Recipes/recipeChain/RecipeChainCalculatorStepOld";

export class RecipeChainCalculator {
    public allSteps: RecipeChainCalculatorCollection = new RecipeChainCalculatorCollection();
    public baseInventory: MaterialInventory;
    public completedPaths: RecipeChainCalculatorCollection = new RecipeChainCalculatorCollection();
    public recipeDictionary: MaterialRecipeDictionary;

    constructor(recipeDictionary: MaterialRecipeDictionary, baseInventory: MaterialInventory) {
        this.recipeDictionary = recipeDictionary;
        this.baseInventory = baseInventory;

        this.allSteps.getOrCreate(new RecipeChain(), this.recipeDictionary, this.baseInventory);
    }

    generatePossibleChainsBreadthFirst() {
        // Process everything, and be sure the arrays are correct
        while (this.allSteps.pendingStepsIds.length !== 0) {
            // Process everything. If there's a discrepancy in the array, don't worry.
            while (this.allSteps.pendingStepsIds.length !== 0) {
                for (const recipeChainCalculatorStep of this.allSteps.pendingSteps) {
                    this.processStep(recipeChainCalculatorStep)
                }
            }

            // Refresh the arrays. This is a expensive computation so we need to it the least possible
            this.allSteps.refreshAllArrays()
            this.allSteps.setInferiorSteps()
        }
    }


    public generatePossibleChainsDepthFirst() {
        // Process everything, and be sure the arrays are correct
        while (this.allSteps.pendingStepsIds.length !== 0) {
            // Process everything. If there's a discrepancy in the array, don't worry.
            while (this.allSteps.pendingStepsIds.length !== 0) {
                const firstPendingStep = this.allSteps.getFirstPendingStep();
                if (firstPendingStep === undefined) {break}
                this.processStep(firstPendingStep)
            }

            // Refresh the arrays. This is a expensive computation so we need to it the least possible
            console.log("Refreshing Arrays")
            this.allSteps.refreshAllArrays()
            this.allSteps.setInferiorSteps()
        }
    }

    public getStepFromRecipeQuantities(recipeQuantities: Dictionary<string, number>) {
        const recipeChain = new RecipeChain();

        for (const recipeQuantity of recipeQuantities) {
            const recipe = this.recipeDictionary.getOrThrow(toPascalCase(recipeQuantity[0]))

            for (let i = 0; i < recipeQuantity[1]; i++) {
                recipeChain.push(recipe)
            }
        }

        return this.allSteps.getOrCreate(recipeChain, this.recipeDictionary, this.baseInventory)
    }

    public processFirstPendingStep() {
        // Get the first step
        const firstPendingStep = this.allSteps.getFirstPendingStep();
        if (firstPendingStep === undefined) {return;}
        this.processStep(firstPendingStep);
    }

    public processStep(step: RecipeChainCalculatorStepOld) {
        console.log("Processing: ", step.toString());

        //step.setInferiorStep()
        //if (step.inferiorTo !== undefined) {
        //    console.log("Removed: ", step.toString(), "Reason:", step.inferiorTo.reason);
        //    return;
        //}

        // Generate the possible childrens
        const generatedSteps = step.getChildrenSteps();
        if (generatedSteps === undefined) {return;}

        for (const nextStep of generatedSteps) {
            this.allSteps.getOrCreate(nextStep, this.recipeDictionary, this.baseInventory);
        }

        this.allSteps.setIdInArrays(step.id)
    }
}

