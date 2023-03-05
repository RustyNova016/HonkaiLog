import {DataTable, DataTableItem} from "@/utils/classes/ORM/DataTable";
import {QuantityOfDataTableItem} from "@/utils/classes/ORM/QuantityOfItems/QuantityOfDataTableItem";

export class InventoryOfDataTableItems<item extends DataTableItem> extends DataTable<QuantityOfDataTableItem<item>> {
    public dataTable: DataTable<item>

    constructor(dataTable: DataTable<item>) {
        super();
        this.dataTable = dataTable
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
    public addInventory(otherInventory: InventoryOfDataTableItems<item>){
        for (const otherQuantity of otherInventory.toValueArray()) {
            this.getOrCreate(otherInventory.id).add(otherQuantity.quantity)
        }
        return this
    }

    /** Removes the content of another inventory from this one */
    public removeInventory(otherInventory: InventoryOfDataTableItems<item>){
        for (const otherQuantity of otherInventory.toValueArray()) {
            this.getOrCreate(otherInventory.id).add(otherQuantity.quantity * -1)
        }
        return this
    }

    /** Add to the quantity of an item */
    public addToItemQuantity(idItem: string, num: number) {
        const item = this.getOrCreate(idItem, 0);
        item.quantity += num
        return this
    }

    /** Create a new inventory entry */
    createEntry(idItem: string, quantity = 0) {
        this.set(idItem, new QuantityOfDataTableItem<item>(idItem, this.dataTable, quantity))
    }

    /** Get an entry, and if it doesn't exist, create a new one */
    public getOrCreate(idItem: string, quantity = 0): QuantityOfDataTableItem<item> {
        const res = this.get(idItem)
        if (res !== undefined) {return res}

        this.createEntry(idItem, quantity);
        return this.getOrCreate(idItem, quantity)
    }

    /** Return all values that have quantities above 0 in a new inventory */
    public getPositiveNonNullCounts() {
        return new InventoryOfDataTableItems(this.dataTable).insertMultiple(this.toValueArray().filter(value => value.quantity > 0))
    }
}