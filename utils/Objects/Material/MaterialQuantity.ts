import {Material} from "@/utils/Objects/Material/Material";
import {z} from "zod";
import {MaterialQuantityJSONZod} from "@/utils/Objects/Material/validations/MaterialQuantity.JSONZod";

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

    public toJSON(): z.infer<typeof MaterialQuantityJSONZod> {
        return {
            material: this.material.export(),
            quantity: this.quantity
        }
    }

    public static parse(data: z.infer<typeof MaterialQuantityJSONZod>): MaterialQuantity {
        return new MaterialQuantity(
            Material.parse(data.material),
            data.quantity
        )
    }
}

export interface MaterialQuantityInterface {
    /** The logs concerned */
    readonly material: Material;

    /** The quantity of the logs */
    readonly quantity: number;
}