import {InventoryNode} from "@/utils/calculators/Recipe/Commons/InventoryNode";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {InventoryGraph} from "@/utils/calculators/Recipe/Commons/InventoryGraph";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

export function getMinPrimaryInventory(inventoryNodes: InventoryNode[], recipes: RecipeDataTable): CollectionOfUnique<InventoryNode> {
        //Get all the materials
        const mats = new CollectionOfUnique<string>()
        mats.push(...inventoryNodes.flatMap(invNod => invNod.getLeftToReduce(recipes).toKeyArray()));
        const matPermutation = mats.permutionsOfAllSizes();

        const bestNodes = new CollectionOfUnique<InventoryNode>()
        bestNodes.push(...matPermutation.flatMap(matPerm => InventoryNode.getMinPrimaryInventoryForFilter(inventoryNodes, matPerm)))
        return bestNodes
    }
    // Get all the children graphs of this node.
    // Get all their primary materials if it has been computed
    // 
}

export function getPrimaryMaterials() {

}

export function minPathPrimaryInventory(inventory: InventoryNode, recipes: RecipeDataTable): InventoryGraph[] {
    const currentGraph = new InventoryGraph(inventory)

    console.log("Current node:", currentGraph.node.inventoryAtNode.id)
    //console.log("Remaining inv:", currentGraph.node.g)


    // Base Case
    // If there are no possible children, then that means that it's only primary materials
    const children = currentGraph.getChildren(recipes);
    if(children.length === 0) {return [currentGraph]}

    // Recursion
    // We get all the min path of the children, then return the minimums
    const minPathsOfChildrens = children.flatMap(childNode => minPathPrimaryInventory(childNode, recipes))
}
