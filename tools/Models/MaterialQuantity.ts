import {Material} from "@/utils/Objects/Material";
import {z} from "zod";

/** A class that represent a quantity of materials. Like a stack of items */
export class MaterialQuantity {
    /** The logs concerned */
    readonly material: Material;

    /** The quantity of the logs */
    readonly quantity: number;

    constructor(material: Material, quantity: number) {
        this.material = material;
        this.quantity = z.number().parse(quantity);
    }
}

