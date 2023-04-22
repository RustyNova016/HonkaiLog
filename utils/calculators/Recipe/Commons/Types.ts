import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

export interface InventoryNodeInterface {
    id: string
    inventoryAtNode: MaterialInventory;

    getPrimaryInventory(recipes: RecipeDataTable): MaterialInventory
    getIntermediaryInventory(recipes: RecipeDataTable): MaterialInventory
    getFinalInventory(recipes: RecipeDataTable): MaterialInventory

    getLeftToReduce(recipes: RecipeDataTable): MaterialInventory
}

export interface InventoryNodeLink {
    parentNode: InventoryNodeInterface;
    childNode: InventoryNodeInterface;
    recipeApplied: MaterialRecipe;

    id: string

    getAllParentsOfNode(node: InventoryNodeInterface, recipes: RecipeDataTable): CollectionOfUnique<InventoryNodeInterface>
    getAllChildrenOfNode(node: InventoryNodeInterface, recipes: RecipeDataTable): CollectionOfUnique<InventoryNodeInterface>
}

export interface InventoryGraphInterface {
    node: InventoryNodeInterface;

    isRecipeAPossibleChildren(recipe: MaterialRecipe, recipes: RecipeDataTable): boolean
    getChildren(recipes: RecipeDataTable): InventoryNodeInterface[];
}