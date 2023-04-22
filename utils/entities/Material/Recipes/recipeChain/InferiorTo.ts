import {InferiorBecause} from "@/utils/entities/Material/Recipes/recipeChain/InferiorBecause";
import {RecipeChainCalculatorStepOld} from "@/utils/entities/Material/Recipes/recipeChain/RecipeChainCalculatorStepOld";

export type InferiorTo = {
    step: RecipeChainCalculatorStepOld,
    reason: InferiorBecause
}