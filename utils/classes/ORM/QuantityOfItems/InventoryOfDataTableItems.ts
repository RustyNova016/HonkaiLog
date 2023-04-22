import {DataTable, DataTableItemType} from "@/utils/classes/ORM/DataTable";
import {
    QuantityOfDataTableItem,
    QuantityOfDataTableItemJSON
} from "@/utils/classes/ORM/QuantityOfItems/QuantityOfDataTableItem";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

export class InventoryOfDataTableItems<baseItem extends DataTableItemType> extends DataTable<QuantityOfDataTableItem<baseItem>> {
    public _dataTable: DataTable<baseItem> | undefined;

    constructor(dataTable: DataTable<baseItem> | undefined = undefined, ...args: any[]) {
        super(...args);
        this._dataTable = dataTable;
    }

    get dataTable() {
        if (this._dataTable === undefined) {throw new Error("Error: Datatable is undefined");}
        return this._dataTable;
    }

    get id(): string {
        let out = "";

        this.toKeyArray()
            .sort()
            .forEach(idItem => {
                const item = this.getOrThrow(idItem);
                if (item.quantity === 0) {return;}
                out += `${item.idQuantity}_`;
            });

        return out;
    }

    /** Return an identifier based the ids of items that exist in the inventory
     *  @example a:1, b:2, c:0 returns a_b_
     * */
    get id_idItems() {
        let out = "";
        this.getNonNullValues().toKeyArray().forEach(idItem => out += `${idItem}_`);
        return out;
    }

    /** Return an identifier based the ids of items and their quantity that exist in the inventory
     *  @example a:1, b:2, c:0 returns a:1_b:2_
     * */
    get id_idQuantity() {return this.id;}

    get totalNumberOfItems(): number {
        let counter = 0;
        this.toValueArray().forEach(item => {counter += item.quantity;});
        return counter;
    }

    public static fromId(id: string) {
        if (id === '') {return new InventoryOfDataTableItems();}

        const newInventory = new InventoryOfDataTableItems();
        id.split("_").forEach(id => {
            if (id === "") {return;}
            newInventory.insertOrThrow(QuantityOfDataTableItem.fromId(id));
        });

        return newInventory;
    }

    public static fromJSON<item extends DataTableItemType>(json: QuantityOfDataTableItemJSON[], dataTable: DataTable<item> | undefined = undefined) {
        return new InventoryOfDataTableItems(dataTable).insertMultipleOrThrow(json.map(value => QuantityOfDataTableItem.fromJSON(value, dataTable)));
    }

    /** Adds the content of another inventory to this one */
    public addInventory(otherInventory: InventoryOfDataTableItems<baseItem>) {
        for (const otherQuantity of otherInventory.toValueArray()) {
            this.getOrCreate(otherQuantity.id).add(otherQuantity.quantity);
        }
        return this;
    }

    /** Add to the quantity of an item */
    public addToItemQuantity(idItem: string, num: number) {
        const item = this.getOrCreate(idItem, 0);
        item.quantity += num;
        return this;
    }

    public clone() {
        return new InventoryOfDataTableItems(this._dataTable).addInventory(this);
    }

    /** Create a new inventory entry */
    createEntry(idItem: string, quantity = 0) {
        this.set(idItem, new QuantityOfDataTableItem<baseItem>(idItem, this._dataTable, quantity));
    }

    public getEuclideanDistanceTo(otherInventory: InventoryOfDataTableItems<any>) {
        const allMaterials = new CollectionOfUnique<string>(...this.toKeyArray(), ...otherInventory.toKeyArray());

        const sumOfSquaredDifferences = allMaterials.reduce(
            (accumulator, currentValue) => {
                return accumulator + (this.getOrCreate(currentValue).quantity - otherInventory.getOrCreate(currentValue).quantity) ** 2;
            },
            0
        );

        return Math.sqrt(sumOfSquaredDifferences);
    }

    /** Return a new inventory that got all quantities being 0 stripped */
    getNonNullValues() {
        return this.filterValues(quant => quant.quantity !== 0);
    }

    /** Get an entry, and if it doesn't exist, create a new one */
    public getOrCreate(idItem: string, quantity = 0): QuantityOfDataTableItem<baseItem> {
        const res = this.get(idItem);
        if (res !== undefined) {return res;}

        this.createEntry(idItem, quantity);
        return this.getOrCreate(idItem, quantity);
    }

    /** Return all values that have quantities above 0 in a new inventory */
    public getPositiveNonNullCounts() {
        return this.filterValues(value => value.quantity > 0);
    }

    public isEqualForAtLeastOneItem(otherInventory: InventoryOfDataTableItems<baseItem>, items: string[]) {
        return items.some(item => this.getOrCreate(item).quantity = otherInventory.getOrCreate(item).quantity);
    }

    public isNull() {
        return !this.toValueArray().some(quant => quant.quantity !== 0);
    }

    public isSelfValuesSuperiorOrEqual(otherInventory: InventoryOfDataTableItems<baseItem>) {
        return !this.toValueArray().some(thisQuant => thisQuant.quantity < otherInventory.getOrCreate(thisQuant.id).quantity);
    }

    public isSorted(otherInventory: InventoryOfDataTableItems<baseItem>, sortedBy: string[]) {
        if (this.isSortedAfter(otherInventory, sortedBy)) {return 1;}
        if (otherInventory.isSortedAfter(this, sortedBy)) {return -1;}
        return 0;
    }

    /** Return true if the inventory has more or the same quantity for at least one item than the other, in order
     * @example For [a, c] -> {a: 5, b: 3, c: 10} > {a: 2, b:5, c:5} > {a: 2, b: 8, c:0}
     * */
    public isSortedAfter(otherInventory: InventoryOfDataTableItems<baseItem>, sortedBy: string[]) {
        // Go through all the sorting list, and try to find an item that has lass than its counterpart,
        // meaning that this is not sorted after
        for (const materialSortedBy of sortedBy) {
            const thisQuantity = this.getOrCreate(materialSortedBy).quantity;
            const otherQuantity = otherInventory.getOrCreate(materialSortedBy).quantity;

            if (thisQuantity > otherQuantity) {return true;}
            if (thisQuantity < otherQuantity) {return false;}
        }

        return this.isSuperiorByAtLeastOne(otherInventory);
    }

    /** Return true if each item superior or equal, but not both inventories equal */
    public isSuperiorByAtLeastOne(otherInventory: InventoryOfDataTableItems<baseItem>) {
        return this.isSuperiorOrEqual(otherInventory) && !this.isEqual(otherInventory);
    }

    /** Return true if all values are superior or equal to the other's */
    public isSuperiorOrEqual(otherInventory: InventoryOfDataTableItems<baseItem>) {
        const allIds = new CollectionOfUnique<string>();
        allIds.push(...this.toKeyArray(), ...otherInventory.toKeyArray());

        for (const id of allIds) {
            const thisVal = this.getOrCreate(id);
            const otherVal = otherInventory.getOrCreate(id);
            if (thisVal.quantity < otherVal.quantity) {return false;}
        }

        return true;
    }

    /** Removes the content of another inventory from this one */
    public removeInventory(otherInventory: InventoryOfDataTableItems<baseItem>) {
        for (const otherQuantity of otherInventory.toValueArray()) {
            this.getOrCreate(otherQuantity.id).add(otherQuantity.quantity * -1);
        }
        return this;
    }

    /** Return true is current inventory is a subset of another */
    public isSubsetOf(otherInventory: InventoryOfDataTableItems<baseItem>) {
        return this.isSuperiorByAtLeastOne(otherInventory)
    }
}
