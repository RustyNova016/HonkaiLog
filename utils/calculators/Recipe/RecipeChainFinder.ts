import {DataTable} from "@/utils/classes/ORM/DataTable";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {RecipeChainFinderStep} from "@/utils/calculators/Recipe/RecipeChainFinderStep";
import {RecipeInventory} from "@/utils/ORMEntities/Recipes/inventory/RecipeInventory";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

export class RecipeChainFinder extends DataTable<RecipeChainFinderStep> {
    /** All the steps that aren't explored yet */
    private stepsToExplore = new CollectionOfUnique<string>();
    /** All the steps that have a completed recipe chain */
    private stepsWithCompleteChain = new CollectionOfUnique<string>();
    /** The inventory wanted */
    private targetInventory: MaterialInventory;

    constructor(recipeTable: RecipeDataTable, targetInventory: MaterialInventory) {
        super();
        this.targetInventory = targetInventory
        this.insert(new RecipeChainFinderStep(this.targetInventory, new RecipeInventory(recipeTable)))
    }

    generateStepsDepthFirst() {
        while (this.stepsToExplore.length !== 0) {
            const idCurrentStep =  this.stepsToExplore[0];
            if(idCurrentStep === undefined) {break}
            this.processStep(this.getOrThrow(idCurrentStep))
        }
    }


    override insert(value: RecipeChainFinderStep) {
        super.insert(value);
        this.updateArraysForStep(value)
        return this
    }

    private processStep(step: RecipeChainFinderStep) {
        console.log("Processing: ", step.toString());

        for (const nextRecipesInventory of step.nextRecipesInventories) {
            this.insert(new RecipeChainFinderStep(this.targetInventory, nextRecipesInventory))
        }

        this.updateArraysForStep(step)
    }

    private updateArraysForStep(step: RecipeChainFinderStep) {
        this.stepsToExplore.addOrRemove(step.id, !step.isProcessed)
    }
}

