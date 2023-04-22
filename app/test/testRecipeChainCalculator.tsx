import {MaterialDataEntity} from "@/utils/entities/MaterialDataEntity";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {
    EtherFuelRecipes,
    G4ElecStigmaRecipes,
    TierIVElecMatRecipes,
    TimeSwirlRecipes
} from "../../tests/material/Test_Recipes";

export function testRecipeChainCalculator(inventoryToTest: MaterialInventory) {
    const materialData = new MaterialDataEntity();
    materialData.materialRecipes
                .insertMultipleFromJSON(TierIVElecMatRecipes)
                .insertMultipleFromJSON(TimeSwirlRecipes)
                .insertMultipleFromJSON(G4ElecStigmaRecipes)
                //.insertMultipleFromJSON(EtherFuelRecipes);

    const recipeChainFinder = materialData.materialRecipes.getRecipeChainFinderForInventory(inventoryToTest, ['Time Swirl', "EtherFuel", "EtherFuel"]);//
    const bestChains = recipeChainFinder.getBestChainsAStar();
    console.log(recipeChainFinder);
    //console.log(`Done in ${recipeChainFinder.processCounter} steps`)

    console.log("Here's the best completed chains");
    for (const completedChain of bestChains) {
        completedChain.debug_log()
        console.log("--------------------");
    }
}