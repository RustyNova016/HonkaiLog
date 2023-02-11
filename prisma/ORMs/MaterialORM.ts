import prismadb from "@/lib/prismadb";
import {MaterialModel} from "@prisma/client";
import {MaterialEntity} from "@/utils/entities/Material/MaterialEntity";

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

    public static async getMaterial(idMaterial: string): Promise<MaterialEntity> {
        const material = await this.getMaterialModel(idMaterial)

        return new MaterialEntity(
            material.id,
            material.name,
            material.namePlural,
            material.imageLink
        )
    }

    private static getPrisma() {
        return prismadb.materialModel;
    }
}