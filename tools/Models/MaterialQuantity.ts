import {Material} from "./Material";

export class MaterialQuantity {
    material: Material;
    quantity: number;

    constructor(material: Material, quantity: number) {
        this.material = material;
        this.quantity = quantity;
    }
}