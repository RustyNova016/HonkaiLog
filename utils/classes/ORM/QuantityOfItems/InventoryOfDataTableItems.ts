import {DataTable, DataTableItem} from "@/utils/classes/ORM/DataTable";
import {
    QuantityOfDataTableItem,
    QuantityOfDataTableItemJSON
} from "@/utils/classes/ORM/QuantityOfItems/QuantityOfDataTableItem";

export class InventoryOfDataTableItems<baseItem extends DataTableItem> extends DataTable<QuantityOfDataTableItem<baseItem>> {
    public _dataTable: DataTable<baseItem> | undefined

    constructor(dataTable: DataTable<baseItem> | undefined = undefined) {
        super();
        this._dataTable = dataTable
    }

    get dataTable() {
        if (this._dataTable === undefined) {throw new Error("Error: Datatable is undefined")}
        return this._dataTable;
    }

    get id(): string {
        let out = "";
        //TODO: Get only non null values
        this.toKeyArray()
            .sort()
            .map(idItem => this.getOrThrow(idItem))
            .forEach(item => out += `${item.id}:${item.quantity}_`);
        return out;
    }

    /** Adds the content of another inventory to this one */
    public addInventory(otherInventory: InventoryOfDataTableItems<baseItem>) {
        for (const otherQuantity of otherInventory.toValueArray()) {
            this.getOrCreate(otherInventory.id).add(otherQuantity.quantity)
        }
        return this
    }

    /** Add to the quantity of an item */
    public addToItemQuantity(idItem: string, num: number) {
        const item = this.getOrCreate(idItem, 0);
        item.quantity += num
        return this
    }

    public clone() {
        return new InventoryOfDataTableItems(this._dataTable).addInventory(this)
    }

    /** Create a new inventory entry */
    createEntry(idItem: string, quantity = 0) {
        this.set(idItem, new QuantityOfDataTableItem<baseItem>(idItem, this._dataTable, quantity))
    }

    /** Get an entry, and if it doesn't exist, create a new one */
    public getOrCreate(idItem: string, quantity = 0): QuantityOfDataTableItem<baseItem> {
        const res = this.get(idItem)
        if (res !== undefined) {return res}

        this.createEntry(idItem, quantity);
        return this.getOrCreate(idItem, quantity)
    }

    /** Return all values that have quantities above 0 in a new inventory */
    public getPositiveNonNullCounts() {
        return new InventoryOfDataTableItems(this._dataTable).insertMultiple(this.toValueArray().filter(value => value.quantity > 0))
    }

    /** Removes the content of another inventory from this one */
    public removeInventory(otherInventory: InventoryOfDataTableItems<baseItem>) {
        for (const otherQuantity of otherInventory.toValueArray()) {
            this.getOrCreate(otherInventory.id).add(otherQuantity.quantity * -1)
        }
        return this
    }

    public static fromJSON<item extends DataTableItem>(json: QuantityOfDataTableItemJSON[], dataTable: DataTable<item> | undefined = undefined){
        return new InventoryOfDataTableItems(dataTable).insertMultiple(json.map(value => QuantityOfDataTableItem.fromJSON(value, dataTable)))
    }
}