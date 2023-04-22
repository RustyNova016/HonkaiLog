import {InventoryGraphInterface} from "@/utils/calculators/Recipe/Commons/Types";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {InventoryNode} from "@/utils/calculators/Recipe/Commons/InventoryNode";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";

export class InventoryGraph implements InventoryGraphInterface {
    public node: InventoryNode;

    constructor(node: InventoryNode) {
        this.node = node;
    }

    public get id() {return this.node.id}

    public getChildren(recipes: RecipeDataTable): InventoryNode[] {
        return recipes
            .filterValues(recipe => this.isRecipeAPossibleChildren(recipe, recipes))
            .map(recipe => new InventoryNode(recipe.unCraft(this.node.inventoryAtNode.cloneShallow())));
    }

    public isRecipeAPossibleChildren(recipe: MaterialRecipe, recipes: RecipeDataTable): boolean {
        return this.node.getLeftToReduce(recipes).toKeyArray().some(mat => recipe.canProduceMaterial(mat));
    }

    public static fromInventory(inventory: MaterialInventory) {
        return new InventoryGraph(new InventoryNode(inventory))
    }

    public static fromId(id: string){return new this(InventoryNode.fromId(id))};
}

