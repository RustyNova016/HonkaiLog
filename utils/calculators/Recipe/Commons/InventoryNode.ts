import {InventoryNodeInterface} from "@/utils/calculators/Recipe/Commons/Types";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

export class InventoryNode implements InventoryNodeInterface {
    public inventoryAtNode: MaterialInventory;

    constructor(inventoryAtNode: MaterialInventory) {
        this.inventoryAtNode = inventoryAtNode;
    }

    public get id() {return this.inventoryAtNode.id;}

    public static fromId(id: string) {
        return new InventoryNode(MaterialInventory.fromId(id));
    }

    public getFinalInventory(recipes: RecipeDataTable): MaterialInventory {return this.inventoryAtNode.filterKeys(recipes.finalMaterialsId);}

    public getIntermediaryInventory(recipes: RecipeDataTable): MaterialInventory {return this.inventoryAtNode.filterKeys(recipes.intermediaryMaterialsId);}

    public getLeftToReduce(recipes: RecipeDataTable): MaterialInventory {
        return this.getFinalInventory(recipes).addInventory(this.getIntermediaryInventory(recipes));
    }

    public hasWorsePrimaryInventory(otherPrimaryInventory: MaterialInventory, recipes: RecipeDataTable) {
        // Get all the primary materials possible
        const mats = new CollectionOfUnique<string>()
        mats.push(...recipes.primaryMaterialsId);
        const matPermutation = mats.permutionsOfAllSizes();

        const bestNodes = new CollectionOfUnique<InventoryNode>()
        bestNodes.push(...matPermutation.flatMap(matPerm => InventoryNode.getMinPrimaryInventoryForFilter(inventoryNodes, matPerm)))
        return bestNodes
    }

    public getPrimaryInventory(recipes: RecipeDataTable): MaterialInventory {return this.inventoryAtNode.filterKeys(recipes.primaryMaterialsId);}
}

