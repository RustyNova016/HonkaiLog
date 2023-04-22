import {MaterialORM} from "@/prisma/ORMs/MaterialORM";
import {MaterialQuantityLogORM} from "@/prisma/ORMs/MaterialQuantityLogORM";
import {MaterialHistoryConverters} from "@/utils/entities/Material/history/MaterialHistoryConverters";
import {MaterialInfo} from "@/utils/types/materials/MaterialInfo";

export class MaterialGetter {
    public static async getServerSideMaterialInfo(idMaterial: string, idUser: string): Promise<MaterialInfo> {
        const material = MaterialORM.get(idMaterial);
        const historyModel = MaterialQuantityLogORM.getMaterialLog(idUser, idMaterial);

        return {
            material: await material,
            history: MaterialHistoryConverters.LogModels_to_HistoryData(await historyModel)
        };
    }

    public static async getServerSideMaterialInfoArray(materialIds: string[], idUser: string): Promise<MaterialInfo[]> {
        return Promise.all(materialIds.map(value => this.getServerSideMaterialInfo(value, idUser)));
    }

    public static async getMaterialInfoArrayServer(idMaterials: string[], idUser = "", history = false): Promise<MaterialInfo[]> {
        return Promise.all(idMaterials.map(value => this.getMaterialInfoServer(value, idUser, history)));
    }

    public static async getMaterialInfoServer(idMaterial: string, idUser = "", history = false): Promise<MaterialInfo> {
        const material = MaterialORM.get(idMaterial);
        const historyModel = history ? MaterialQuantityLogORM.getMaterialLog(idUser, idMaterial) : undefined;

        return {
            material: await material,
            history: historyModel !== undefined ? MaterialHistoryConverters.LogModels_to_HistoryData(await historyModel) : undefined
        };
    }
}