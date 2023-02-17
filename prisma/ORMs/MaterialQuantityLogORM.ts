import prismadb from "@/lib/prismadb";
import {z} from "zod";
import {MaterialQuantityLogModel} from ".prisma/client";
import {MaterialQuantityLog} from "@/utils/entities/Material/MaterialQuantityLog";
import {MaterialORM} from "@/prisma/ORMs/MaterialORM";
import {MaterialQuantityLogModelCreateOneSchema} from "@/prisma/generated/schemas";
import {MaterialLogExport} from "@/utils/types/export/MaterialLogExport";
import {UserDataExport} from "@/utils/types/export/UserDataExport";
import {MaterialHistoryExport} from "@/utils/types/export/MaterialHistoryExport";
import {toPascalCase} from "@/utils/functions/ToPascalCase";
import {LogOrderType} from "@/utils/enums/LogOrderType";

export class MaterialQuantityLogORM {
    public static async getByQuantityAtTimeIndex(quantityTotal: number, atTime: Date | string, idUser: string, idMaterial: string) {
        return this.getPrisma().findUnique({
            where: {
                UniqueQuantityAtATime: {
                    atTime,
                    idUser,
                    idMaterial,
                    quantityTotal
                }
            }
        })
    }

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
                idMaterial: toPascalCase(idMaterial),
                idUser
            }
        })
    }

    public static async insertUserDataExport(data: UserDataExport) {
        const inserts = []
        console.log(data)
        for (const materialHistoryExport of data.MaterialHistory) {
            inserts.push(this.insertMaterialHistoryExport(materialHistoryExport, data.idUser))
        }
        return Promise.all(inserts)
    }

    private static async create(data: z.infer<typeof MaterialQuantityLogModelCreateOneSchema>): Promise<MaterialQuantityLogModel> {
        //TODO: Check for existing logs
        //TODO: Add comment
        //TODO: Link logs
        return this.getPrisma().create(data);
    }

    private static async createOrUpdate(data: z.infer<typeof MaterialQuantityLogModelCreateOneSchema>, idUser: string, idMaterial: string): Promise<MaterialQuantityLogModel> {
        const log = data.data;
        const found = await this.getByQuantityAtTimeIndex(log.quantityTotal, log.atTime, idUser, idMaterial)

        if (found === null) {
            return this.create(data)
        }

        return this.getPrisma().update({
            data: {...log, importTime: found.importTime},
            where: {
                id: found.id,
            }
        })
    }

    private static getPrisma() {
        return prismadb.materialQuantityLogModel;
    }

    private static async insertMaterialHistoryExport(data: MaterialHistoryExport, idUser: string) {
        const inserts = []
        let lastLog = undefined;
        const material = MaterialORM.findOrCreateMaterial(data.idMaterial);

        for (const log of data.logs) {
            lastLog = this.insertMaterialLogExport(
                log,
                idUser,
                (await material).id,
                data.logOrder === LogOrderType.newestToOldest ? (await lastLog)?.id : undefined,
                data.logOrder === LogOrderType.oldestToNewest ? (await lastLog)?.id : undefined
            )
            // TODO: Link Back
            inserts.push(lastLog);
        }
        return Promise.all(inserts)
    }

    private static async insertMaterialLogExport(data: MaterialLogExport, idUser: string, idMaterial: string, idNextLog?: string | undefined, idPreviousLog?: string | undefined) {
        return this.createOrUpdate({
            data: {
                atTime: data.atTime,
                quantityTotal: data.quantityTotal,
                quantityChange: data.quantityChange,
                comment: data.comment,
                importTime: data.importTime,
                idUser,
                idMaterial,
                idNextLog: idNextLog !== undefined ? idNextLog : null,
                idPreviousLog: idPreviousLog !== undefined ? idPreviousLog : null,
            }
        }, idUser, idMaterial)
    }

    private static link(idLog: string) {
        //TODO
    }
}

