import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {RecipeChainNodeTable} from "@/utils/calculators/Recipe/Star/RecipeChainNodeTable";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {IdChecklist} from "@/utils/classes/ORM/IdChecklist";
import {RecipeChainNode} from "@/utils/calculators/Recipe/Star/RecipeChainNode";
import {RecipeChainBuilder} from "@/utils/calculators/Recipe/RecipeChainBuilder";

/** Implementing the Astar algorithm to search the best recipe chain */
export class RecipeFinderAStar {
    public nodes = new RecipeChainNodeTable();
    public visitedNodes = new IdChecklist();
    public numberIte = 0;

    constructor(public startInventory: MaterialInventory = new MaterialInventory(),
                public minimizePrimaryMaterials: string[],
                public builder: RecipeChainBuilder) {

        const startNode = new RecipeChainNode(startInventory, this.nodes, this.builder)
        this.nodes.insert(startNode);
        this.visitedNodes.set(startNode.id, false)
    }

    get recipes(): RecipeDataTable {return this.builder.recipes}

    get targetInventory(): MaterialInventory {return this.builder.invTargetMaterials}

    public getBestNode() {
        while (this.visitedNodes.falseValues.length > 0) {
            const bestNextNode = this.getBestNodeToVisit()
            if(bestNextNode === undefined) {break}

            const achievedNode = this.visitNode(bestNextNode)
            if(achievedNode === undefined) {continue}

            console.log("Processed in:", this.numberIte)
            return achievedNode
        }

        throw new Error("Error: Cannot go to node")
    }

    public visitNode(node: RecipeChainNode) {
        this.numberIte += 1;
        console.log("Node N°", this.numberIte)
        node.debug_log()
        this.visitedNodes.set(node.id, true);

        if(node.hasAchievedTarget()){
            return node
        }

        node.getChildren().forEach(child => {
            // If we already visited it, then ignore
            if(this.visitedNodes.trueValues.includes(child.id)) {return}

            // If the node is new, then add it
            if(!this.unvisitedNodes.includes(child.id)) {
                this.nodes.insert(child)
                this.visitedNodes.set(child.id, false)
                return;
            }

            // If we found a better path to the node, set the better path
            const oldChild = this.nodes.getOrThrow(child.id)
            if(oldChild.getCostFromStartNode_GCost()
                       .isSortedAfter(child.getCostFromStartNode_GCost(),
                                      this.minimizePrimaryMaterials
                       )
            ) {
                this.nodes.insert(child)
                this.visitedNodes.set(child.id, false)
                return;
            }
        })
        return
    }

    get unvisitedNodes() {
        return this.visitedNodes.falseValues
    }

/*    public getBestNodeToVisit() {
        const allPotentialBestNextNodes = this.unvisitedNodes.map(nodeId => this.nodes.getOrThrow(nodeId))

        // We get all the nodes that have the best estimated total cost
        const bestFCostNodes = allPotentialBestNextNodes.filter(node => {
            // It is the best FCost if the FCost is the lowest of them all
            return allPotentialBestNextNodes.every(otherNode => {
                return !node.getEstimatedTotalCost_FCost().isSortedAfter(
                    otherNode.getEstimatedTotalCost_FCost(),
                    this.minimizePrimaryMaterials
                )
            })
        })

        return bestFCostNodes[0]
    }*/

        public getBestNodeToVisit() {
        const allPotentialBestNextNodes = this.unvisitedNodes.map(nodeId => this.nodes.getOrThrow(nodeId))

        // We get all the nodes that have the best estimated total cost
        allPotentialBestNextNodes.sort((nodeA, nodeB) => nodeA.FCost() - nodeB.FCost())

        return allPotentialBestNextNodes[0]
    }
}