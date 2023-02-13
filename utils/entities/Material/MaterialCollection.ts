import {z} from "zod";
import {Material} from "@/utils/entities/Material/Material";
import {MaterialCollectionJSONZod} from "@/utils/entities/Material/validations/MaterialCollection.JSONZod";
import {MaterialModel} from "@prisma/client";

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

    public static fromModels(data: MaterialModel[]){
        const collection: Material[] = [];

        for (const materialJson of data) {
            collection.push(Material.fromModel(materialJson))
        }

        return new MaterialCollection(collection);
    }
}