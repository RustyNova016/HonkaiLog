import {OneToMany} from "@/utils/classes/ORM/OneToMany";

export class ManyToMany {
    private readonly leftItem_hasMany_rightItem = new OneToMany();
    private readonly rightItem_hasMany_leftItems = new OneToMany();

    public getFromRightTable(rightTableId: string) {
        return this.rightItem_hasMany_leftItems.getOrCreate(rightTableId);
    }

    public getFromLeftTable(leftTableId: string) {
        return this.leftItem_hasMany_rightItem.getOrCreate(leftTableId);
    }

    isChildOf(rightTableId: string, leftTableId: string) {
        return this.leftItem_hasMany_rightItem.getOrCreate(rightTableId).includes(leftTableId);
    }

    isParentOf(rightTableId: string, leftTableId: string) {
        return this.rightItem_hasMany_leftItems.getOrCreate(leftTableId).includes(rightTableId);
    }

    public linkIds(leftTableId: string, rightTableId: string) {
        this.leftItem_hasMany_rightItem.link(leftTableId, rightTableId);
        this.rightItem_hasMany_leftItems.link(rightTableId, leftTableId);
    }

    public unlinkIds(leftTableId: string, rightTableId: string) {
        this.leftItem_hasMany_rightItem.unlink(leftTableId, rightTableId);
        this.rightItem_hasMany_leftItems.unlink(rightTableId, leftTableId);
    }
}