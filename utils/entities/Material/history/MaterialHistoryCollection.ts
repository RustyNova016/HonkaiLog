import {MaterialHistory} from "@/utils/entities/Material/MaterialHistory";

export class MaterialHistoryCollection {
    private readonly collection = new Map<string, MaterialHistory>()

    constructor(collection: MaterialHistory[]) {
        for (const materialHistory of collection) {
            this.add(materialHistory)
        }
    }

    public add(history: MaterialHistory) {
        // TODO: Check if history is already in
        this.collection.set(history.idMaterial, history)
    }

    public get(idMaterial: string) {
        return this.collection.get(idMaterial)
    }
}