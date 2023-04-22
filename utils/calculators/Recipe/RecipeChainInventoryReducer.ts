import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {RecipeChainBuilder} from "@/utils/calculators/Recipe/RecipeChainBuilder";
import {RecipeChain} from "@/utils/ORMEntities/Recipes/inventory/RecipeChain";

/** This class try to find the best possible way to get an inventory */
export class RecipeChainInventoryReducer {
    /** Prefer chains that have less X, Y, Z */
    public targetInventory: MaterialInventory;
    public builder: RecipeChainBuilder;

    constructor(targetInventory: MaterialInventory, builder: RecipeChainBuilder) {
        this.targetInventory = targetInventory;
        this.builder = builder;
    }

    public getBestChainFor(primaryMaterialPreference: string[]) {
        // If the target inventory is null, return an empty chain
        if(this.targetInventory.getPositiveNonNullCounts().isNull()) {
            return new RecipeChain(this.builder.recipes)
        }
    }
}