import {DataTable} from "@/utils/classes/ORM/DataTable";
import {InventoryNode} from "@/utils/calculators/Recipe/Commons/InventoryNode";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {InventoryGraph} from "@/utils/calculators/Recipe/Commons/InventoryGraph";

export type InventoryNodeLike = InventoryGraph | InventoryNode | MaterialInventory | string;

export class InventoryGraphTable extends DataTable<InventoryGraph> {
    public getSubgraphs(node: InventoryGraph | InventoryNode | MaterialInventory) {
        return this.toValueArray().filter(graphNode => graphNode.node.inventoryAtNode.isSubsetOf(MaterialInventory.fromId(node.id)));
    }

    public getRemainingGraph(node: InventoryGraph | InventoryNode | MaterialInventory, subgraph: InventoryGraph | InventoryNode | MaterialInventory) {
        return node;
    }

    public create(id: string) {
        this.insert(InventoryGraph.fromId(id));
    }

    public getOrCreate(id: InventoryNodeLike) {
        if(typeof id !== "string"){
            id = id.id
        }

        let node = this.get(id);
        if (node !== undefined) {return node;}

        this.create(id);
        return this.getOrThrow(id);
    }

    public getMinPrimaryMaterials(node: InventoryNodeLike){
        node = this.getOrCreate(node)
        const subgraphs = this.getSubgraphs(node);

        if (subgraphs.length === 0) {}
    }
}
