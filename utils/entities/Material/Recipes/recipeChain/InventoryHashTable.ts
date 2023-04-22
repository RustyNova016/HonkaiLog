import {IdObjectDictionary} from "@/utils/classes/IdObjectDictionary";
import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";

export class InventoryHashTable extends IdObjectDictionary<MaterialInventory> {


}

export class StepInventoryMapper {
    public fullInventoryHashTable = new InventoryHashTable();
    public PrimaryInventoryHashTable = new InventoryHashTable();
    public fullInventoryHashTable = new InventoryHashTable();
}