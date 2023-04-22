import {idMaterial, Material} from "@/utils/entities/Material/Material";
import {z} from "zod";
import {MaterialQuantityJSONZod} from "@/utils/entities/Material/validations/MaterialQuantity.JSONZod";

export type MaterialQuantityType = {
    idMaterial: idMaterial;
    quantity: number;
}

export type MaterialQuantityWithTime = MaterialQuantityType & {time: number}

/** A class that represent a quantity of materials. Like a stack of items */
export class MaterialQuantity implements MaterialQuantityType {
    /** The logs concerned */
    readonly material: Material;

    /** The quantity of the logs */
    readonly quantity: number;

    constructor(material: Material, quantity: number) {
        this.material = material;
        this.quantity = z.number().parse(quantity);
    }

    public toJSON(): z.infer<typeof MaterialQuantityJSONZod> {
        return {
            material: this.material.export(),
            quantity: this.quantity
        }
    }

}

export interface MaterialQuantityInterface {
    /** The logs concerned */
    readonly material: Material;

    /** The quantity of the logs */
    readonly quantity: number;
}