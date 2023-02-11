import {MaterialEntity} from "@/utils/entities/Material/MaterialEntity";
import {z} from "zod";
import {MaterialQuantityJSONZod} from "@/utils/entities/Material/validations/MaterialQuantity.JSONZod";

/** A class that represent a quantity of materials. Like a stack of items */
export class MaterialQuantity {
    /** The logs concerned */
    readonly material: MaterialEntity;

    /** The quantity of the logs */
    readonly quantity: number;

    constructor(material: MaterialEntity, quantity: number) {
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
            MaterialEntity.parse(data.material),
            data.quantity
        )
    }
}

export interface MaterialQuantityInterface {
    /** The logs concerned */
    readonly material: MaterialEntity;

    /** The quantity of the logs */
    readonly quantity: number;
}