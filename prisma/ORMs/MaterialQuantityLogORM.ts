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

    public static async insertHoyoCrystalLog(log: HoyoCrystalLog, idUser: string, idImport: string) {
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
        const found = await this.findByTimestamp(atTime, quantityTotal, idMaterial)

        if (found === null) {
            return this.create({
                data: {
                    atTime: atTime,
                    comment: comment,
                    quantityChange: quantityChange,
                    quantityTotal: quantityTotal,
                    idMaterial: idMaterial,
                    idUser,
                    idImport
                }
            })
        }

        if (found.idImport === null) {
            this.getPrisma().update({
                data: {
                    idImport: idImport
                },
                where: {
                    quantityTotal_atTime_idMaterial: {
                        atTime,
                        idMaterial,
                        quantityTotal
                    }
                }
            })
        }

        return
    }

    public static insertHoyoCrystalLogs(log: HoyoCrystalLog[], idUser: string, idImport: string) {
        const insertPromises = []

        for (const hoyoCrystalLog of log) {
            insertPromises.push(this.insertHoyoCrystalLog(hoyoCrystalLog, idUser, idImport));
        }

        return Promise.all(insertPromises)
    }

    private static async create(data: z.infer<typeof MaterialQuantityLogModelCreateOneSchema>) {
        //TODO: Check for existing logs
        //TODO: Add comment
        return this.getPrisma().create(data);
    }

    private static async findByTimestamp(atTime: Date, quantityTotal: number, idMaterial: string) {
        return this.getPrisma().findUnique({
            where: {
                quantityTotal_atTime_idMaterial: {
                    atTime,
                    idMaterial,
                    quantityTotal
                }
            }
        })
    }

    private static getPrisma() {
        return prismadb.materialQuantityLogModel;
    }
}