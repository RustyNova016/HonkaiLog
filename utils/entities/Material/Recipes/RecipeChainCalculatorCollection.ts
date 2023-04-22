import {IdObjectDictionary} from "@/utils/classes/IdObjectDictionary";
import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {RecipeChain} from "@/utils/entities/Material/Recipes/recipeChain/RecipeChain";
import {MaterialRecipeDictionary} from "@/utils/entities/Material/Recipes/MaterialRecipeDictionary";
import {RecipeChainCalculatorStepOld} from "@/utils/entities/Material/Recipes/recipeChain/RecipeChainCalculatorStepOld";

import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

export class RecipeChainCalculatorCollection extends IdObjectDictionary<RecipeChainCalculatorStepOld> {
    public completedChainStepsIds = new CollectionOfUnique<string>()
    public pendingStepsIds = new CollectionOfUnique<string>()

    get bestCompletedSteps() {
        return this.filterValues(steps => !steps.isInferior && steps.isCompletedChain)
    }

    get completedSteps() {
        return this.filterValues(step => step.isCompletedChain)
    }

    get endedSteps() {
        return this.filterValues(step => step.isEnded)
    }

    get pendingSteps() {
        return this.pendingStepsIds.map(idStep => this.getOrThrow(idStep))
    }

    override add(value: RecipeChainCalculatorStepOld) {
        super.add(value);
        this.setIdInArrays(value.id)
        return this
    }

    getFirstPendingStep() {
        this.sortPendingSteps()
        const step = this.pendingStepsIds.at(0);
        if (step === undefined) {return;}
        return this.get(step)
    }

    public getOrCreate(recipeCol: RecipeChain, recipeAvailable: MaterialRecipeDictionary, baseInventory: MaterialInventory) {
        const recipeChainCalculatorStep = this.get(recipeCol.id);
        if (recipeChainCalculatorStep !== undefined) {return recipeChainCalculatorStep}

        this.add(new RecipeChainCalculatorStepOld(recipeCol, recipeAvailable, baseInventory, this));
        return this.getOrThrow(recipeCol.id)
    }

    /** Refresh the arrays */
    public refreshAllArrays() {
        this.toValueArray().forEach(item => {this.setIdInArrays(item.id)})
    }

    public setIdInArrays(idStep: string) {
        const step = this.get(idStep)
        if (step === undefined) {return}

        if (step.isPending) {
            this.pendingStepsIds.push(idStep)
        } else {
            this.pendingStepsIds.remove(idStep)
        }

        if (step.isCompletedChain) {
            this.completedChainStepsIds.push(idStep)
        } else {
            this.completedChainStepsIds.remove(idStep)
        }
    }

    public setInferiorSteps() {
        for (const recipeChainCalculatorStep of this.toValueArray()) {
            recipeChainCalculatorStep.setInferiorStep()
        }
    }

    public sortPendingSteps() {
        return this.pendingStepsIds.sort()
    }
}