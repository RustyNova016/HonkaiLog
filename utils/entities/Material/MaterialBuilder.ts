import {MaterialHistoryCollection} from "@/utils/entities/Material/history/MaterialHistoryCollection";
import {Material} from "@/utils/entities/Material/Material";
import {MaterialCollection} from "@/utils/entities/Material/MaterialCollection";
import {MaterialRecipeDictionary} from "@/utils/entities/Material/Recipes/MaterialRecipeDictionary";
import {MaterialInfo} from "@/utils/types/materials/MaterialInfo";
import {MaterialLogCollection} from "@/utils/entities/Material/MaterialLogCollection";

export class MaterialBuilder {
    public static convertToEntities(data: MaterialInfo) {
        const material = Material.fromModel(data.material);
        let history

        if(data.history !== undefined) {
            history = MaterialLogCollection.fromHistoryExport(data.history)

                    material.history = history;
                    history.material = material;
        }

        if(data.recipes !== undefined) {
            material.recipes = MaterialRecipeDictionary.fromJSON(data.recipes)
        }

        return {material, history}
    }

    /** Convert material info into a MaterialCollection and a HistoryCollection */
    public static convertToEntitiesCollection(data: MaterialInfo[]) {
        const materials = new MaterialCollection();
        const histories = new MaterialHistoryCollection();

        for (const datum of data) {
            const {material, history} = this.convertToEntities(datum);
            materials.add(material);

            if(history !== undefined){histories.add(history);}
        }

        return {materials, histories}
    }
}