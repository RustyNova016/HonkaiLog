import {Material} from "./Material";
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
        logging.info("Creating material id: " + id, "MaterialCollection")
        const material = await Material.getMaterialFromId(id);

        if (fetchLogs){
            logging.info("Fetching log for material id: " + id, "MaterialCollection")
            await material.fetchLogs()
            logging.info("Log fetched", "MaterialCollection")
            logging.info("HasLogs state: " + material.hasLogs(), "MaterialCollection")
        }

        this.materials.push(material);
        return material;
    }
}