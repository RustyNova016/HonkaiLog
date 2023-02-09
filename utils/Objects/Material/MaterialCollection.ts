import {z} from "zod";
import {Material} from "@/utils/Objects/Material/Material";
import {MaterialCollectionJSONZod} from "@/utils/Objects/Material/validations/MaterialCollection.JSONZod";

export class MaterialCollection {
    public readonly collection: Material[]

    constructor(collection: Material[]) {
        this.collection = collection;
    }

    public static parse(MaterialCollectionJson: z.infer<typeof MaterialCollectionJSONZod>) {
        const collection: Material[] = [];

        for (const materialJson of MaterialCollectionJson) {
            collection.push(Material.parse(materialJson))
        }

        return new MaterialCollection(collection);
    }
}