import {DataTable} from "@/utils/classes/ORM/DataTable";
import {InventoryNodeLike} from "@/utils/calculators/Recipe/Commons/InventoryGraphTable";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {InventoryNode} from "@/utils/calculators/Recipe/Commons/InventoryNode";

export class InventoryNodeTable extends DataTable<InventoryNode> {
    public create(id: string) {
        this.insert(InventoryNode.fromId(id));
    }

    public getOrCreate(id: InventoryNodeLike): InventoryNode {
        if (typeof id !== "string") {
            id = id.id;
        }

        let node = this.get(id);
        if (node !== undefined) {return node;}

        this.create(id);
        return this.getOrThrow(id);
    }

    public getParents(node: InventoryNode, recipes: RecipeDataTable) {
        return recipes.map(recipe => recipe.produceOne(node.inventoryAtNode.cloneShallow()))
                      .map(inventory => this.getOrCreate(inventory.id));
    }
}
