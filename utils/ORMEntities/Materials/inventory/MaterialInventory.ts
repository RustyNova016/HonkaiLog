import {InventoryOfDataTableItems} from "@/utils/classes/ORM/QuantityOfItems/InventoryOfDataTableItems";
import {Material} from "@/utils/entities/Material/Material";
import {
    QuantityOfDataTableItem,
    QuantityOfDataTableItemJSON
} from "@/utils/classes/ORM/QuantityOfItems/QuantityOfDataTableItem";

export class MaterialInventory extends InventoryOfDataTableItems<Material> {
    public insertMultipleFromJSON(values: QuantityOfDataTableItemJSON[]) {
        values.forEach(value => this.insert(
            new QuantityOfDataTableItem<Material>(value.id, this._dataTable, value.quantity)
        ))
        return this
    }
}