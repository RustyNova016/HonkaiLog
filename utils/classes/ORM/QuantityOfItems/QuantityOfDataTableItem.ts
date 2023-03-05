import {DataTable, DataTableItem} from "@/utils/classes/ORM/DataTable";

export class QuantityOfDataTableItem<item extends DataTableItem> {
    public readonly id: string;
    public quantity = 0;
    private readonly _dataTable?: DataTable<item> | undefined

    constructor(id: string, dataTable: DataTable<item> | undefined = undefined, quantity: number = 0) {
        this.id = id;
        this.quantity = quantity;
        this._dataTable = dataTable;
    }

    public getOrThrow() {
        return this.dataTable.getOrThrow(this.id)
    }

    get dataTable(): DataTable<item> {
        if(this._dataTable === undefined){throw new Error("Error: Datatable is undefined")}
        return this._dataTable;
    }

    public static fromItem<item extends DataTableItem>(item: item, dataTable: DataTable<item>, quantity: number = 0) {
        return new QuantityOfDataTableItem(item.id, dataTable, quantity);
    }

    /** Add a number to the quantity */
    public add(num: number) {
        this.quantity += num
    }
}

