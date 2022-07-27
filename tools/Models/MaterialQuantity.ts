import {Material} from "./Material";

/** A class that represent a quantity of materials. Like a stack of items */
export class MaterialQuantity {
    /** The material concerned */
    readonly material: Material;

    /** The quantity of the material */
    readonly quantity: number;

    constructor(material: Material, quantity: number) {
        this.material = material;
        this.quantity = quantity;
    }
}

