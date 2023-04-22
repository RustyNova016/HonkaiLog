import {Relation} from "@/lib/ORMUtils/Relations/types";
import {DataTable, DataTableItemType} from "@/utils/classes/ORM/DataTable";


export class OneToOneRelation<leftTableItem extends DataTableItemType, rightTableItem extends DataTableItemType> implements Relation<leftTableItem, rightTableItem> {
    public leftTable: DataTable<leftTableItem>;
    public rightTable: DataTable<rightTableItem>;

    private leftItemHas = new Map<string, string>();
    private rightItemHas = new Map<string, string>();

    constructor(leftTable: DataTable<leftTableItem>, rightTable: DataTable<rightTableItem>) {
        this.leftTable = leftTable;
        this.rightTable = rightTable;
    }

    public getFromLeftTable(leftItem: leftTableItem | string) {
        if (typeof leftItem !== "string") {leftItem = leftItem.id;}

        const leftItemRelations = this.leftItemHas.get(leftItem);
        if (leftItemRelations === undefined) {return undefined;}
        return this.rightTable.get(leftItemRelations);
    }

    public getFromRightTable(rightItem: leftTableItem | string) {
        if (typeof rightItem !== "string") {rightItem = rightItem.id;}

        const rightItemRelations = this.rightItemHas.get(rightItem);
        if (rightItemRelations === undefined) {return undefined;}
        return this.leftTable.get(rightItemRelations);
    }

    public link(leftItem: leftTableItem | string, rightItem: rightTableItem | string): void {
        this.leftItemHas.set(this.getIdOfObject(leftItem), this.getIdOfObject(rightItem));
        this.rightItemHas.set(this.getIdOfObject(rightItem), this.getIdOfObject(leftItem));
    }

    public unLink(leftItem: leftTableItem | string, rightItem: rightTableItem | string) {
        this.leftItemHas.delete(this.getIdOfObject(leftItem));
        this.rightItemHas.delete(this.getIdOfObject(rightItem));
    }

    private getIdOfObject(obj: leftTableItem | rightTableItem | string): string {
        if (typeof obj === "string") {return obj;}
        return obj.id;
    }
}
