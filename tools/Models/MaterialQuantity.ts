import {Material} from "./Material";

export class MaterialQuantity {
    material: Material;
    quantity: number;

    constructor(material: Material, quantity: number) {
        this.material = material;
        this.quantity = quantity;
    }

    /** Give the difference between the quantity and the current funds of the user. */
    getQuantityDifferenceWithCurrent(): number {
        return this.quantity - this.material.getInGameCount();
    }
}