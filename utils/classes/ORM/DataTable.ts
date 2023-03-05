import {Dictionary} from "@/utils/classes/Dictionary";

export type DataTableItem = {id: string}

export class DataTable<item extends DataTableItem> extends Dictionary<string, item> {
    public insert(value: item) {
        const valueAlreadyExists = this.get(value.id)
        if(valueAlreadyExists !== undefined) {throw new Error("Error: Cannot insert value. Id already defined")}
        this.set(value.id, value)
        return this
    }

    public insertMultiple(values: item[]) {
        values.forEach(value => this.insert(value))
        return this
    }
}


