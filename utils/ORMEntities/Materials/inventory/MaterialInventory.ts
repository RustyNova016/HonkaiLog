import {InventoryOfDataTableItems} from "@/utils/classes/ORM/QuantityOfItems/InventoryOfDataTableItems";
import {Material} from "@/utils/entities/Material/Material";
import {
    QuantityOfDataTableItem,
    QuantityOfDataTableItemJSON
} from "@/utils/classes/ORM/QuantityOfItems/QuantityOfDataTableItem";
import {Dictionary} from "@/utils/classes/Dictionary";

export class MaterialInventory extends InventoryOfDataTableItems<Material> {
    public insertMultipleFromJSON(values: QuantityOfDataTableItemJSON[]) {
        values.forEach(value => this.insertOrThrow(
            new QuantityOfDataTableItem<Material>(value.id, this._dataTable, value.quantity)
        ))
        return this
    }

    public static override fromId(id: string){
        return super.fromId(id).overwriteInto(new MaterialInventory())
    }

    public static from(valToCopy: Dictionary<string, QuantityOfDataTableItem<Material>>): MaterialInventory {
        return new MaterialInventory().insertMultiple(valToCopy.toValueArray())
    }

    public override filterKeys(whitelist: string[]) {
        return super.filterKeys(whitelist).overwriteInto(new MaterialInventory())
    }

    public override getPositiveNonNullCounts(){
        return super.getPositiveNonNullCounts().overwriteInto(new MaterialInventory());
    }

    /** Multiply all quantities by -1 into a new inventory */
    public invertQuantities() {
        return this.cloneShallow().forEach(quantity => quantity.quantity = quantity.quantity * -1)
    }
}
