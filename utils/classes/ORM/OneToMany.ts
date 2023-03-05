import {Dictionary} from "@/utils/classes/Dictionary";
import {DataTable, DataTableItem} from "@/utils/classes/ORM/DataTable";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

export class OneToMany<leftTableItem extends DataTableItem, rightTableItem extends DataTableItem> extends Dictionary<string, CollectionOfUnique<string>> {
    private leftTable: DataTable<leftTableItem>;
    private rightTable: DataTable<rightTableItem>;

    constructor(leftTable: DataTable<leftTableItem>, rightTable: DataTable<rightTableItem>) {
        super()
        this.leftTable = leftTable;
        this.rightTable = rightTable;
    }
}