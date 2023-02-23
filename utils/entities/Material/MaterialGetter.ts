import {MaterialORM} from "@/prisma/ORMs/MaterialORM";
import {MaterialQuantityLogORM} from "@/prisma/ORMs/MaterialQuantityLogORM";
import {MaterialHistoryConverters} from "@/utils/entities/Material/history/MaterialHistoryConverters";
import {MaterialInfo} from "@/utils/entities/Material/MaterialBuilder";

export class MaterialGetter {
    public static async getServerSideMaterialInfoArray(materialIds: string[], idUser: string): Promise<MaterialInfo[]> {
        return Promise.all(materialIds.map(value => this.getServerSideMaterialInfo(value, idUser)))
    }

    public static async getServerSideMaterialInfo(idMaterial: string, idUser: string): Promise<MaterialInfo> {
        const material = MaterialORM.get(idMaterial);
        const historyModel = MaterialQuantityLogORM.getMaterialLog(idUser, idMaterial);

        return {
            material: await material,
            history: MaterialHistoryConverters.LogModels_to_HistoryData(await historyModel)
        }
    }
}