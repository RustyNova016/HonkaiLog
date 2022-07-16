import {Material} from "./Material";
import {MaterialWithLogs} from "./MaterialWithLogs";
import {MaterialQuantityWithLogs} from "./MaterialQuantityWithLogs";

/** A class that represent a quantity of materials. Like a stack of items */
export class MaterialQuantity {
    readonly material: Material;
    quantity: number;

    constructor(material: Material, quantity: number) {
        this.material = material;
        this.quantity = quantity;
    }

    public addLogsFrom(material: MaterialWithLogs): MaterialQuantityWithLogs {
        return MaterialQuantityWithLogs.addLogsToMaterialQuantity(this, material)
    }
}

