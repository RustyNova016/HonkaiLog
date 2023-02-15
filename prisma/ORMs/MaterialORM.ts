import prismadb from "@/lib/prismadb";
import {MaterialModel} from "@prisma/client";
import {Material} from "@/utils/entities/Material/Material";
import {MaterialHistory} from "@/utils/entities/Material/MaterialHistory";
import {MaterialQuantityLogORM} from "@/prisma/ORMs/MaterialQuantityLogORM";
import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";

export class MaterialORM {
    public static async findMaterialByName(materialName: string) {
        return this.getPrisma().findMany({
            where: {
                name: materialName.toLowerCase()
            }
        });
    }

    public static async getAllMaterials() {
        return this.getPrisma().findMany()
    }

    public static async getMaterialModel(idMaterial: string): Promise<MaterialModel> {
        return this.getPrisma().findUniqueOrThrow({
            where: {
                id: idMaterial
            }
        })
    }

    public static async getMaterial(idMaterial: string): Promise<Material> {
        const material = await this.getMaterialModel(idMaterial)

        return new Material(
            material.id,
            material.name,
            material.namePlural,
            material.imageLink
        )
    }

    private static getPrisma() {
        return prismadb.materialModel;
    }

    public static async getMaterialHistory(idMaterial: string, idUser: string){
        return MaterialHistory.fromModels(
            await MaterialORM.getMaterialModel(idMaterial),
            await MaterialQuantityLogORM.getMaterialQuantityLogsModel(idUser, idMaterial),
            idUser
        )
    }

    public static async getMaterialHistoryCalculator(idMaterial: string, idUser: string): Promise<MaterialHistoryCalculator> {
        return new MaterialHistoryCalculator(await this.getMaterialHistory(idMaterial, idUser))
    }
}