import prismadb from "@/lib/prismadb";
import {HoyoCrystalLog} from "@/utils/types/api/hoyoverse/FetchHoyoCrystalLogRes";
import {z} from "zod";
import dayjs from "dayjs";
import {MaterialQuantityLogModel} from ".prisma/client";
import {MaterialQuantityLog} from "@/utils/entities/Material/MaterialQuantityLog";
import {MaterialORM} from "@/prisma/ORMs/MaterialORM";
import {MaterialQuantityLogModelCreateOneSchema} from "@/prisma/generated/schemas";

export class MaterialQuantityLogORM {
    public static async getMaterialQuantityLogs(idMaterial: string, idUser: string): Promise<MaterialQuantityLog[]> {
        const materialLogCol = []

        for (const materialQuantityLogsModelElement of await this.getMaterialQuantityLogsModel(idMaterial, idUser)) {
            materialLogCol.push(MaterialQuantityLog.fromModel(materialQuantityLogsModelElement))
        }

        return materialLogCol
    }

    public static getMaterialQuantityLogsModel(idUser: string, idMaterial: string): Promise<MaterialQuantityLogModel[]> {
        return this.getPrisma().findMany({
            where: {
                idMaterial,
                idUser
            }
        })
    }

    public static async insertHoyoCrystalLog(log: HoyoCrystalLog, idUser: string, idImport: string, idNextLog: string | null) {
        console.log("Inserting log: ", log)

        const material = (await MaterialORM.findMaterialByName("crystal"))[0];
        if (material === undefined) {
            throw new Error("Material not found")
        }


        const atTime = dayjs(z.string().parse(log.item[0].value)).toDate();
        const comment = z.string().parse(log.item[1].value);
        const quantityChange = z.number().parse(parseInt(log.item[2].value));
        const quantityTotal = z.number().parse(parseInt(log.item[3].value));
        const idMaterial = material.id;
        const foundLogs = await this.getPrisma().findMany({
            where: {
                idMaterial: material.id,
                quantityTotal,
                atTime,
                idUser
            }
        })

        if (foundLogs.length === 0) {
            return this.create({
                data: {
                    atTime: atTime,
                    comment: comment,
                    quantityChange: quantityChange,
                    quantityTotal: quantityTotal,
                    idMaterial: idMaterial,
                    idUser,
                    idImport,
                    idNextLog
                }
            })
        }
        return
    }

    public static async insertHoyoCrystalLogs(log: HoyoCrystalLog[], idUser: string, idImport: string) {
        let lastLog
        const allLogs = []

        for (const hoyoCrystalLog of log) {
            const idLastLog = (await lastLog)?.id;
            lastLog = this.insertHoyoCrystalLog(hoyoCrystalLog, idUser, idImport, idLastLog === undefined ? null : idLastLog);
            allLogs.push(lastLog)
        }

        return allLogs
    }

    private static async create(data: z.infer<typeof MaterialQuantityLogModelCreateOneSchema>): Promise<MaterialQuantityLogModel> {
        //TODO: Check for existing logs
        //TODO: Add comment
        return this.getPrisma().create(data);
    }

    private static getPrisma() {
        return prismadb.materialQuantityLogModel;
    }


}