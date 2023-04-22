import {DataTableItemType} from "@/utils/class/ORM/ORM/DataTable";
import {DataTable} from "@/utils/classes/ORM/DataTable";

export interface Relation<leftTableItem extends DataTableItemType, rightTableItem extends DataTableItemType> {
    leftTable: DataTable<leftTableItem>;
    rightTable: DataTable<rightTableItem>;

    link(leftItem: leftTableItem | string, rightItem: rightTableItem | string): void
    unLink(leftItem: leftTableItem | string, rightItem: rightTableItem | string): void


}