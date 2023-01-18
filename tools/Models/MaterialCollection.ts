import {Material} from "@/utils/Objects/Material";
import logging from "../Logger";

export class MaterialCollection {
    private static instance: MaterialCollection;
    materials: Material[] = []

    static getCollection(): MaterialCollection {
        if (MaterialCollection.instance === undefined) {
            MaterialCollection.instance = new MaterialCollection();
        }

        return MaterialCollection.instance;
    }

    findMaterial(id?: number, fetchLogs?: boolean) {
        if (id !== undefined) {
            return this.findMaterialById(id, fetchLogs);
        }
    }

    async findMaterialById(id: number, fetchLogs?: boolean): Promise<Material> {
        // First search the collection
        for (const material of this.materials) {
            if (material.id === id) return material
        }

        // If it isn't in the collection, create the object
        logging.info("Creating logs id: " + id, "MaterialCollection")
        const material = await Material.getMaterialFromId(id);


        this.materials.push(material);
        return material;
    }
}