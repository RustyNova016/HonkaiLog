import {z} from "zod";
import {Material} from "@/utils/entities/Material/Material";
import {MaterialCollectionJSONZod} from "@/utils/entities/Material/validations/MaterialCollection.JSONZod";
import {MaterialModel} from "@prisma/client";

export class MaterialCollection {
    public readonly collection: Map<string, Material> = new Map<string, Material>()

    constructor(collection: Material[] = []) {
        for (const material of collection) {
            this.collection.set(material.id, material);
        }
    }

    public static fromModels(data: MaterialModel[]) {
        const collection: Material[] = [];

        for (const materialJson of data) {
            collection.push(Material.fromModel(materialJson))
        }

        return new MaterialCollection(collection);
    }

    public static parse(MaterialCollectionJson: z.infer<typeof MaterialCollectionJSONZod>) {
        const collection: Material[] = [];

        for (const materialJson of MaterialCollectionJson) {
            collection.push(Material.parse(materialJson))
        }

        return new MaterialCollection(collection);
    }

    public add(material: Material) {
        // TODO: Check if material is already in
        this.collection.set(material.id, material)
    }

    public toArray(): Material[] {
        return Array.from(this.collection, ([, value]) => (value));
    }
}