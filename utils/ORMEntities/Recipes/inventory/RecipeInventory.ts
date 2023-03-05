import {InventoryOfDataTableItems} from "@/utils/classes/ORM/QuantityOfItems/InventoryOfDataTableItems";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";

export class RecipeInventory extends InventoryOfDataTableItems<MaterialRecipe> {
    public override _dataTable: RecipeDataTable;

    constructor(dataTable: RecipeDataTable) {
        super(dataTable);
        this._dataTable = dataTable
    }

    override get dataTable() {
        if (this._dataTable === undefined) {throw new Error("Error: Datatable is undefined")}
        return this._dataTable;
    }

    get recipeTable() {return this.dataTable}

    /** Goes through all the recipes in reverse */
    public unCraftInventory(inventory: MaterialInventory) {
        for (const recipe of this.toValueArray()) {
            for (let i = 0; i < recipe.quantity; i++) {
                inventory = recipe.getOrThrow().unCraft(inventory);
            }
        }
        return inventory;
    }
}