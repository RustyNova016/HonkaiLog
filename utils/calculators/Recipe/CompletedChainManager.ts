import {ListOfBest} from "@/utils/classes/ORM/listOfBest";
import {RecipeChainFinderStepOld} from "@/utils/calculators/Recipe/ChainStep/RecipeChainFinderStepOld";

export class BestCompletedStep extends ListOfBest {
    insertStep(step: RecipeChainFinderStepOld) {
        this.set(step.id, step.isIrreducible);
    }
}