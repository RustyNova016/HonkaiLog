import {RecipeInventory} from "@/utils/ORMEntities/Recipes/inventory/RecipeInventory";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";

export class RecipeChainFinderStep {
    private _nextRecipesInventories: RecipeInventory[] | undefined
    private currentMatInventory: MaterialInventory
    private recipeChain: RecipeInventory;

    constructor(targetInventory: MaterialInventory, recipeInventory: RecipeInventory) {
        this.currentMatInventory = recipeInventory.unCraftInventory(targetInventory.cloneShallow())
        this.recipeChain = recipeInventory
    }

    get id() {return this.recipeChain.id}

    get isProcessed() {return this._nextRecipesInventories !== undefined}

    /** Return all the possible Recipe Inventories */
    get nextRecipesInventories(): RecipeInventory[] {
        if (this._nextRecipesInventories !== undefined) {return this._nextRecipesInventories}

        const recipeAvailable = this.recipeChain.recipeTable.getRecipesThatConsume(this.currentMatInventory.getPositiveNonNullCounts().toKeyArray())
        this._nextRecipesInventories = recipeAvailable.map(recipe => this.recipeChain.cloneShallow().addToItemQuantity(recipe.id, 1))
        return this._nextRecipesInventories
    }
}