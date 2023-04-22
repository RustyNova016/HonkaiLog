import {DataTable, DataTableItemType} from "@/utils/classes/ORM/DataTable";
import {z} from "zod";

export type QuantityOfDataTableItemJSON = {id: string, quantity: number}

export class QuantityOfDataTableItem<item extends DataTableItemType> {
    public readonly id: string;
    public quantity = 0;
    private readonly _dataTable?: DataTable<item> | undefined
    get idQuantity() {
        return `${this.id}:${this.quantity}`
    }

    constructor(id: string, dataTable: DataTable<item> | undefined = undefined, quantity: number = 0) {
        this.id = id;
        this.quantity = quantity;
        this._dataTable = dataTable;
    }

    public static fromId(id:string, dataTable: DataTable<item> | undefined = undefined) {
        const idSplit = id.split(":")
        return new QuantityOfDataTableItem(idSplit[0] as string, dataTable, z.number().parse(parseInt(idSplit[1] as string)))
    }

    get dataTable(): DataTable<item> {
        if (this._dataTable === undefined) {throw new Error("Error: Datatable is undefined")}
        return this._dataTable;
    }

    public static from<item extends DataTableItemType>(item: item, dataTable: DataTable<item>, quantity: number = 0) {
        return new QuantityOfDataTableItem(item.id, dataTable, quantity);
    }

    public static fromJSON<item extends DataTableItemType>(quantityJson: QuantityOfDataTableItemJSON, dataTable: DataTable<item> | undefined = undefined){
        return new QuantityOfDataTableItem(quantityJson.id, dataTable, quantityJson.quantity)
    }

    /** Add a number to the quantity */
    public add(num: number) {
        this.quantity += num
    }

    public getOrThrow() {
        return this.dataTable.getOrThrow(this.id)
    }
}

