import {MaterialDataEntity} from "@/utils/entities/MaterialDataEntity";
import {TierIVElecMatRecipes, TimeSwirlRecipes} from "./Test_Recipes";
import {TierIVLightningStone12} from "./Test_Material_Inventory";

describe('RecipeChainBuilder Tests', function () {
    const materialData = new MaterialDataEntity();
    materialData.materialRecipes.insertMultipleFromJSON(TierIVElecMatRecipes).insertMultipleFromJSON(TimeSwirlRecipes);

    it('should output the best results', function () {
        const recipeChainFinder = materialData.materialRecipes.getRecipeChainFinderForInventory(TierIVLightningStone12, ['Time Swirl']);

        expect(recipeChainFinder.getBestChains()).toEqual(["BuyingWithEtherfuel:2_MirageFlour7:5_", "BuyingWithEtherfuel:4_MirageFlour7WithHoard:1_"]);
    });

    //describe('should be able to sort the steps', function () {
    //    const recipeChainFinder =
    // materialData.materialRecipes.getRecipeChainFinderForInventory(TierIVLightningStone12, ['Time Swirl'])
//
    //    it('should have valid values for best step', function () {
    //        const finder = new ChainFinder();
    //    });
    //});
});