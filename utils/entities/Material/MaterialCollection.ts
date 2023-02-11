import {z} from "zod";
import {MaterialEntity} from "@/utils/entities/Material/MaterialEntity";
import {MaterialCollectionJSONZod} from "@/utils/entities/Material/validations/MaterialCollection.JSONZod";
import {MaterialModel} from "@prisma/client";

export class MaterialCollection {
    public readonly collection: MaterialEntity[]

    constructor(collection: MaterialEntity[]) {
        this.collection = collection;
    }

    public static parse(MaterialCollectionJson: z.infer<typeof MaterialCollectionJSONZod>) {
        const collection: MaterialEntity[] = [];

        for (const materialJson of MaterialCollectionJson) {
            collection.push(MaterialEntity.parse(materialJson))
        }

        return new MaterialCollection(collection);
    }

    public static fromModels(data: MaterialModel[]){
        const collection: MaterialEntity[] = [];

        for (const materialJson of data) {
            collection.push(MaterialEntity.fromModel(materialJson))
        }

        return new MaterialCollection(collection);
    }
}