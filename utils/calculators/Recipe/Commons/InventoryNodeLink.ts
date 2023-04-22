import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {InventoryNode} from "@/utils/calculators/Recipe/Commons/InventoryNode";

export class InventoryNodeLink {
    child: InventoryNode;
    parent: InventoryNode;
    recipe: MaterialRecipe;

    constructor(parent: InventoryNode, child: InventoryNode, recipe: MaterialRecipe) {
        this.parent = parent;
        this.child = child;
        this.recipe = recipe;
    }

    public static fromParent(parent: InventoryNode, recipe: MaterialRecipe) {
        return new this(parent, new InventoryNode(recipe.unCraft(parent.inventoryAtNode) ), recipe)
    }

    public static getAllChildren(parent: InventoryNode, recipes: RecipeDataTable) {
        return recipes
            .getRecipesThatProduce(parent.getLeftToReduce(recipes).toKeyArray())
            .map(recipe => InventoryNodeLink.fromParent(parent, recipe))
    }

    get id() {return `${this.parent.id}_${this.recipe}`}
}
