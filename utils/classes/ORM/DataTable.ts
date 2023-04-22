import {Dictionary} from "@/utils/classes/Dictionary";

export type DataTableItemType = { id: string }


export class DataTable<item extends DataTableItemType> extends Dictionary<string, item> {
    public get id() {
        let out = "";
        this.toKeyArray()
            .sort()
            .forEach(id => out += `${id}_`);
        return out;
    }

    public insert(value: item) {
        if (this.get(value.id) !== undefined) {return this;}

        this.set(value.id, value);
        this.onInsert(value);
        return this;
    }

    public insertMultiple(values: item[]) {
        values.forEach(value => this.insert(value));
        return this;
    }

    public insertMultipleOrThrow(values: item[]) {
        values.forEach(value => this.insertOrThrow(value));
        return this;
    }

    public insertOrThrow(value: item) {
        if (this.get(value.id) !== undefined) {throw new Error("Error: Cannot insert value. Id already defined");}

        this.insert(value);
        return this;
    }

    protected onInsert(value: item): any {return value;}
}
