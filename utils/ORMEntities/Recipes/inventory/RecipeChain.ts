import {InventoryOfDataTableItems} from "@/utils/classes/ORM/QuantityOfItems/InventoryOfDataTableItems";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";

export class RecipeChain extends InventoryOfDataTableItems<MaterialRecipe> {
    public override _dataTable: RecipeDataTable;

    constructor(recipeTable: RecipeDataTable) {
        super(recipeTable);
        this._dataTable = recipeTable;
    }

    public static override fromId(id: string, recipeTable: RecipeDataTable) { return super.fromId(id).overwriteInto(new RecipeChain(recipeTable))}

    override get dataTable() {
        if (this._dataTable === undefined) {throw new Error("Error: Datatable is undefined");}
        return this._dataTable;
    }

    public getNumberOfChildren() {
        return this.recipeTable.size
    }

    get recipeTable() {return this.dataTable;}

    /** How many parents the chain can have */
    public getNumberOfParents() {return this.size;}

    public override getOrCreate(idItem: string, quantity: number = 0) {
        return super.getOrCreate(idItem, quantity);
    }

    public getPossibleParents() {
        return this.map((quantity) => {
            const parent = this.cloneShallow();
            parent.getOrCreate(quantity.id).add(-1);
            return parent;
        });
    }

    public getPossibleChildren() {
        return this.dataTable.map((recipe) => {
            const child = this.cloneShallow();
            child.getOrCreate(recipe.id).add(1);
            return child;
        });
    }

    /** The number of recipe in the chain */
    public getRecipeCount() {return this.totalNumberOfItems;}

    public isChildOf(maybeParentChain: RecipeChain) {
        // You can't be your own parent
        if (this.id === maybeParentChain.id) {return false;}

        // You can't be the parent if you have fewer steps!
        if (this.totalNumberOfItems < maybeParentChain.totalNumberOfItems) {return false;}

        return this.isSuperiorOrEqual(maybeParentChain);
    }

    /** Goes through all the recipes in reverse */
    public unCraftInventory(inventory: MaterialInventory) {
        for (const recipe of this.toValueArray()) {
            for (let i = 0; i < recipe.quantity; i++) {
                inventory = this.recipeTable.getOrThrow(recipe.id).unCraft(inventory);
            }
        }
        return inventory;
    }

    /** Return a material recipe chain made of only the recipe that produces final materials*/
    public getFinalRecipesChain() {
        const finalMatRecipesIds = this.recipeTable.getFinalMaterialRecipes().toKeyArray();

        return this.filterValues(recipeQuant => finalMatRecipesIds.includes(recipeQuant.id)).overwriteInto(new RecipeChain(this.recipeTable))
    }
}