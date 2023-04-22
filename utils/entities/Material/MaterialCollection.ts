import {MaterialIdMap} from "@/utils/classes/MaterialIdMap";
import {Material} from "@/utils/entities/Material/Material";
import {MaterialModel} from "@prisma/client";

export class MaterialCollection extends MaterialIdMap<Material> {
    public static fromModels(data: MaterialModel[]) {
        const collection: Material[] = [];

        for (const materialJson of data) {
            collection.push(Material.fromModel(materialJson));
        }

        return new MaterialCollection().addMultiple(collection);
    }
}