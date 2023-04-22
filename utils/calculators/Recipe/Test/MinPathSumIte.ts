import {InventoryNode} from "@/utils/calculators/Recipe/Commons/InventoryNode";
import {Collection} from "@/utils/classes/Collection";
import {Dictionary} from "@/utils/classes/Dictionary";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {InventoryNodeLink} from "@/utils/calculators/Recipe/Commons/InventoryNodeLink";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";

export type BestRecipeChain = {
    primaryInventory: MaterialInventory;
    recipes: Collection<MaterialRecipe>;
}

export class MinPathSumIte {
    private stack = new Collection<InventoryNode>()
    public cache = new Dictionary<string, BestRecipeChain[]>();
    public recipes: RecipeDataTable;


    public getMinOfNode(node: InventoryNode, parentBests: BestRecipeChain[]): BestRecipeChain[] {
        const cached = this.cache.get(node.id);
        if(cached !== undefined) {return cached}

        // If node is worse than bests, don't bother
        if(parentBests.some(best => node.getPrimaryInventory(this.recipes).isSortedAfter()))


        // Get Children
        const children = InventoryNodeLink.getAllChildren(node, this.recipes)

        // If no children return node, call last callback

    }
}
