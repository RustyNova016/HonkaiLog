import {DataTableItemType} from "@/utils/classes/ORM/DataTable";
import {Relation} from "@/lib/ORMUtils/Relations/types";

export class ManyToManyRelation<leftTableItem extends DataTableItemType, rightTableItem extends DataTableItemType> implements Relation<leftTableItem, rightTableItem> {

}