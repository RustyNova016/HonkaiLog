import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {RecipeChainNodeTable} from "@/utils/calculators/Recipe/Star/RecipeChainNodeTable";
import {RecipeChain} from "@/utils/ORMEntities/Recipes/inventory/RecipeChain";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {RecipeChainBuilder} from "@/utils/calculators/Recipe/RecipeChainBuilder";

export class RecipeChainNode {
    public costFromStartNode: MaterialInventory = new MaterialInventory();
    public currentChain: RecipeChain;

    constructor(
        public inventoryAtNode: MaterialInventory,
        public table: RecipeChainNodeTable,
        public builder: RecipeChainBuilder,
        public recipe: MaterialRecipe | undefined = undefined,
        public parent: RecipeChainNode | undefined = undefined
    ) {
        this.currentChain = new RecipeChain(this.recipeTable);
        if (this.recipe !== undefined && this.parent !== undefined) {
            this.costFromStartNode = this.recipe.unCraft(this.parent.costFromStartNode.cloneShallow()).getPositiveNonNullCounts();
            this.currentChain = this.parent.currentChain.cloneShallow().addToItemQuantity(this.recipe.id, 1);
        }
    }

    get id() {return this.inventoryAtNode.id;}

    get recipeTable() {return this.builder.recipes;}

    get targetInventory() {return this.builder.invTargetMaterials;}

    public debug_log() {
        console.log(`
        id: ${this.id}
        Chain id: ${this.currentChain.id}
        
        Costs:
            - Cost from the start node (G Cost): ${this.getCostFromStartNode_GCost().id}
                - As distance: ${this.GCost()}
            - Cost to the end node (H cost): ${this.getCostToEndNode_HCost().id}
                - As distance: ${this.HCost()}
            - Estimated end cost (F Cost): ${this.getEstimatedTotalCost_FCost().id}
                - As distance: ${this.FCost()}
                
        Returned Materials: ${this.inventoryAtNode.getPositiveNonNullCounts().id}
        `);
    }

    public getChildren() {
        return this.recipeTable.toValueArray().map(recipe => {
            const childInv = recipe.unCraft(this.inventoryAtNode.cloneShallow());
            const childNode = new RecipeChainNode(childInv, this.table, this.builder, recipe, this);

            if (!childNode.isValid()) {return;}
            return childNode;
        }).removeUndefined();
    }

    public getCostFromStartNode_GCost() {return this.costFromStartNode.cloneShallow();}
    public GCost() {return this.targetInventory.getEuclideanDistanceTo(this.getCostFromStartNode_GCost()) + this.currentChain.totalNumberOfItems} // TODO: Put proper starting inventory

    public HCost() {return new MaterialInventory().getEuclideanDistanceTo(this.inventoryAtNode.getPositiveNonNullCounts())}

    public FCost() {return this.GCost() + this.HCost()}

    public getCostToEndNode_HCost() {
        return new MaterialInventory()
                   .removeInventory(this.inventoryAtNode.getPositiveNonNullCounts())
                   .addInventory(this.getIntermediaryMaterialsInv().invertQuantities().getPositiveNonNullCounts())
                   .getPositiveNonNullCounts();
    }

    public getEstimatedTotalCost_FCost() {
        return this.getCostFromStartNode_GCost().addInventory(this.getCostToEndNode_HCost());
    }

    public getFinalMaterialsInv() {
        return this.inventoryAtNode.filterKeys(this.recipeTable.finalMaterialsId);
    }

    public getIntermediaryMaterialsInv() {
        return this.inventoryAtNode.filterKeys(this.recipeTable.intermediaryMaterialsId);
    }

    /** Return all the intermediary materials that were used, but didn't had enough */
    public getMaterialsInDebt() {
        return this.recipeTable
                   .intermediaryMaterialsId
                   .filter(materialId => this.inventoryAtNode.getOrCreate(materialId).quantity < 0);
    }

    public getPrimaryMaterialsInv() {
        return this.inventoryAtNode.filterKeys(this.recipeTable.primaryMaterialsId);
    }

    /** Return true if it has achieved the target */
    public hasAchievedTarget() {
        //const primaryMaterialsInv = this.getPrimaryMaterialsInv().invertQuantities().getPositiveNonNullCounts();
        const intermediaryMaterialsInv = this.getIntermediaryMaterialsInv().invertQuantities().getPositiveNonNullCounts();
        const finalMaterialsInv = this.getFinalMaterialsInv().getPositiveNonNullCounts();
        return intermediaryMaterialsInv.totalNumberOfItems === 0 && finalMaterialsInv.totalNumberOfItems  === 0
    }

    public isValid() {
        const intermediaryMaterialsInv = this.getIntermediaryMaterialsInv();
        const finalMaterialsInv = this.getFinalMaterialsInv();
        return intermediaryMaterialsInv // Check if there are negative intermediary materials.
                .invertQuantities()            // If there is, it means that it's unreachable
                .getPositiveNonNullCounts()
                .isNull()

            // Check if there are negative final materials.
            // If there is, it means that it is unreachable
            && finalMaterialsInv
                .invertQuantities()
                .getPositiveNonNullCounts()
                .isNull();
    }

    //private getUsefulRecipes() {
    //    // Are there recipes that can produce material required in the end cost with the current inventory? Then do them.
    //    const possibleRecipes = this.recipeTable.getRecipesThatProduce(this.getCostToEndNode_HCost().toKeyArray())
    //    if(possibleRecipes.length !== 0) {return this.recipe}
//
    //    // Else just use primary materials
    //    return this.recipeTable.getRecipesThatConsume(this.recipeTable.primaryMaterialsId)
    //}

    /** Return true if the recipe is useful for the current situation */
    private isRecipeUseful(recipe: MaterialRecipe) {
        // If there are materials in debt, process them now
        //const materialInDebt = this.getMaterialsInDebt();
        //if (materialInDebt.length > 0 && recipe.materialIdProduced.includeOneOf(materialInDebt)) {return true;}
        //if (materialInDebt.length > 0) {return false;}

        // If the recipe provides materials needed to get to the final node, go ahead
        if (recipe.materialIdProduced.includeOneOf(this.getCostToEndNode_HCost().toKeyArray())) {return true;}
        return false;
    }
}

/** Get all the inventories that, through recipes, can produce the target inventory */
function getInventoriesToProduceInventory(inv: MaterialInventory): {inventory: MaterialInventory, recipe: MaterialRecipe}[]{}

/** Get all the irreducible inventories that, through recipes, can produce the target inventory
 *  return undefined if there's not enough info to calculate it */
function getBestPrimaryInvForInv(inv: MaterialInventory, pref): MaterialInventory | undefined {}