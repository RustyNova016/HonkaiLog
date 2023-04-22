import {Collection} from "@/utils/classes/Collection";

export interface AStarZoneNode {

    hasMoreCostThan(otherNode: AStarZoneNode): boolean;
    isCloserToGoalThan(otherNode: AStarZoneNode): boolean;
}

export abstract class AStarZoneAlgo<nodeType extends AStarZoneNode> {
    public bestNodes: Collection<nodeType> = new Collection<nodeType>()

    public abstract nodeHasMoreCostThanNode(node: nodeType, otherNode: nodeType): boolean
    public abstract nodeIsCloserToGoalThanNode(node: nodeType, otherNode: nodeType): boolean
    public abstract isInTarget(node: nodeType): boolean
    public abstract getAllLinksOfNode

    public handleTargetNode(node: nodeType){
        this.bestNodes.push(node);
        this.cleanupBestNodes();
    }

    public cleanupBestNodes() {
        const newBestNodes = this.bestNodes.filter(nodeA => {
            return this.bestNodes.every(nodeB => this.nodeHasMoreCostThanNode(nodeB, nodeA))
        })
        this.bestNodes = newBestNodes
    }

    public searchNode(node: nodeType) {
        this.bestNodes.remove(node)
        if (this.isInTarget(node)) {this.handleTargetNode(node)}


    }
}
