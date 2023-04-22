import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";
import {Memoize} from 'typescript-memoize';
import {SiRottentomatoes} from "react-icons/all";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";


export class InventoryNodeParenting {
    
}


export class InventoryNode {
    public inventory: MaterialInventory;

    constructor(inventory: MaterialInventory) {
        this.inventory = inventory;
    }

    public isReduced(recipes: RecipeDataTable) {
        return this.getIntermediaryMaterials(recipes).isNull()
            && this.getFinalMaterials(recipes).isNull()
    }

    public get inventoryToReduce() {return this.inventory.cloneShallow().getPositiveNonNullCounts();}

    public getPrimaryInventory(recipes: RecipeDataTable) {return this.inventory.filterKeys(recipes.primaryMaterialsId)}
    public getIntermediaryMaterials(recipes: RecipeDataTable) {return this.inventory.filterKeys(recipes.intermediaryMaterialsId)}
 public getFinalMaterials(recipes: RecipeDataTable) {return this.inventory.filterKeys(recipes.finalMaterialsId)}

    public static getMinPrimaryInventoryForFilter(inventoryNodes: InventoryNode[], mats: string[]){
        return inventoryNodes.filter(inventoryNode => inventoryNode.isMinimumPrimaryInventory(inventoryNodes, mats))
    }

    public static getMinPrimaryInventory(inventoryNodes: InventoryNode[]): CollectionOfUnique<InventoryNode> {
        //Get all the materials
        const mats = new CollectionOfUnique<string>()
        mats.push(...inventoryNodes.flatMap(invNod => invNod.inventoryToReduce.toKeyArray()));
        const matPermutation = mats.permutionsOfAllSizes();

        const bestNodes = new CollectionOfUnique<InventoryNode>()
        bestNodes.push(...matPermutation.flatMap(matPerm => InventoryNode.getMinPrimaryInventoryForFilter(inventoryNodes, matPerm)))
        return bestNodes
    }

    public getPossibleReducedInventories(recipes: RecipeDataTable) {
        return this.getPossibleReducerRecipes(recipes).map(recipe => {
            return recipe.unCraft(this.inventory.cloneShallow());
        });
    }

    public getPossibleReducerRecipes(recipes: RecipeDataTable) {
        return recipes.getRecipesThatProduce(this.inventoryToReduce.toKeyArray());
    }

    //TODO: Test Memoize
    public isMinimumPrimaryInventory(otherNodes: InventoryNode[], mats: string[]) {
        return otherNodes.every(otherNode => otherNode.inventory.isSortedAfter(this.inventory, mats))
    }


    /*public getPossibleProducerRecipes(recipes: RecipeDataTable) {
     return recipes.getRecipesThatProduce(this.inventory.toKeyArray())
     }

     public getPossibleProducedInventories(recipes: RecipeDataTable) {
     return this.getPossibleProducerRecipes(recipes).map(recipe => {
     return recipe.produceOne(this.inventory.cloneShallow())
     })
     }*/
}

export class InventoryNodeGrapher {
    currentNode: InventoryNode;
    childNodes = new CollectionOfUnique<InventoryNode>();
    graphTable

    get children
}


export class InventoryGraphReducer {
    public getInventoryReduced(inventory: MaterialInventory, recipes: RecipeDataTable){

    }




    //TODO: Test Memoize
    //@Memoize((inventory: MaterialInventory, recipes: RecipeDataTable) => inventory.id + "_" + recipes.id)
    public getSmallestPrimaryInventories(inventory: MaterialInventory, recipes: RecipeDataTable): CollectionOfUnique<InventoryNode> {
        const currentNode = new InventoryNode(inventory);
        if(currentNode.isReduced(recipes)) {
            const col = new CollectionOfUnique<InventoryNode>()
            col.push(currentNode)
            return col
        }


        return InventoryNode.getMinPrimaryInventory(
            currentNode
                .getPossibleReducedInventories(recipes)
                .flatMap(childInv => this.getSmallestPrimaryInventories(childInv, recipes)));
    }
}