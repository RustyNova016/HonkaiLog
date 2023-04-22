import {DataTable} from "@/utils/classes/ORM/DataTable";
import {InventoryNodeTable} from "@/utils/calculators/Recipe/Commons/InventoryNodeTable";
import {InventoryNodeLike} from "@/utils/calculators/Recipe/Commons/InventoryGraphTable";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {InventoryNodeLink} from "@/utils/calculators/Recipe/Commons/InventoryNodeLink";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {InventoryNode} from "@/utils/calculators/Recipe/Commons/InventoryNode";

export class InventoryNodeLinkTable extends DataTable<InventoryNodeLink> {
    private nodeTable: InventoryNodeTable;

    constructor(nodeTable: InventoryNodeTable) {
        super();
        this.nodeTable = nodeTable;
    }

    public static isRecipeAPossibleChildren(node: InventoryNode, recipe: MaterialRecipe, recipes: RecipeDataTable): boolean {
        return node.getLeftToReduce(recipes).toKeyArray().some(mat => recipe.canProduceMaterial(mat));
    }

    public static isRecipeAPossibleParent(node: InventoryNode, recipe: MaterialRecipe, recipes: RecipeDataTable): boolean {
        return node.getLeftToReduce(recipes).toKeyArray().some(mat => recipe.canProduceMaterial(mat));
    }

    public getChildrenOfNode(node: InventoryNodeLike, recipes: RecipeDataTable) {
        const fetchedNode = this.nodeTable.getOrCreate(node);

        return recipes
            .map(recipe => {
                if (!InventoryNodeLinkTable.isRecipeAPossibleChildren(fetchedNode, recipe, recipes)) {return;}

                const link = InventoryNodeLink.fromParent(fetchedNode.inventoryAtNode, recipe);
                this.insert(link);
                return link;
            })
            .removeUndefined();
    }

    public getParentsOfNode(node: InventoryNodeLike) {
        return this.toValueArray().filter(link => link.child.id !== this.nodeTable.getOrCreate(node).id)
    }
}
