import {MaterialHistoryData} from "@/utils/types/export/MaterialHistoryData";
import {MaterialModel} from "@prisma/client";
import {Material} from "@/utils/entities/Material/Material";
import {MaterialLogCollection} from "@/utils/entities/Material/MaterialLogCollection";
import {MaterialCollection} from "@/utils/entities/Material/MaterialCollection";
import {MaterialHistoryCollection} from "@/utils/entities/Material/history/MaterialHistoryCollection";

export interface MaterialInfo {
    history: MaterialHistoryData
    material: MaterialModel,
}

export class MaterialBuilder {
    public static convertToEntities(data: MaterialInfo) {
        const material = Material.fromModel(data.material);
        const history = MaterialLogCollection.fromHistoryExport(data.history)

        material.history = history;
        history.material = material;

        return {material, history}
    }

    /** Convert material info into a MaterialCollection and a HistoryCollection */
    public static convertToEntitiesCollection(data: MaterialInfo[]) {
        const materials = new MaterialCollection();
        const histories = new MaterialHistoryCollection();

        for (const datum of data) {
            const {material, history} = this.convertToEntities(datum);
            materials.add(material);
            histories.add(history);
        }

        return {materials, histories}
    }


}