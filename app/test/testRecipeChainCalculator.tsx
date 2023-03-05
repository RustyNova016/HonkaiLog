import {MaterialDataEntity} from "@/utils/entities/MaterialDataEntity";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {TierIVElecMatRecipes} from "../../tests/material/Test_Recipes";

export function testRecipeChainCalculator(inventoryToTest: MaterialInventory) {
    const materialData = new MaterialDataEntity();
    materialData.materialRecipes.fromJSON(TierIVElecMatRecipes)//.addFromJson(TimeSwirlRecipes)

    const recipeStepTree = materialData.materialRecipes.getRecipeChainFinderForInventory(inventoryToTest);
    recipeStepTree.generateStepsDepthFirst();
    console.log(recipeStepTree);

    //let prev;
    //for (const completedPath of recipeStepTree.allSteps.bestCompletedSteps.toValueArray()) {
    //    completedPath.debug_logs()
    //    console.log("--------------------")
    //    //prev = completedPath
    //}
}