import {DataTable, DataTableItemType} from "@/utils/classes/ORM/DataTable";
import {InventoryOfDataTableItems} from "@/utils/classes/ORM/QuantityOfItems/InventoryOfDataTableItems";

/** Table of possible inventories */
export class TableOfInventories<baseItem extends DataTableItemType> extends DataTable<InventoryOfDataTableItems<baseItem>> {
    public override insert(value: InventoryOfDataTableItems<baseItem>) {
        super.insert(value);
        return this;
    }

    sortByItem(items: string[]) {
        this.toValueArray()
            .sort((a, b) => {
                      if (a.isSortedAfter(b, items)) { return 1;}
                      if (b.isSortedAfter(a, items)) { return -1;}
                      return 0;
                  }
            );
    }
}