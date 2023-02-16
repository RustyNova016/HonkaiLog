import prismadb from "@/lib/prismadb";
import {z} from "zod";
import {MaterialQuantityLogModel} from ".prisma/client";
import {MaterialQuantityLog} from "@/utils/entities/Material/MaterialQuantityLog";
import {MaterialORM} from "@/prisma/ORMs/MaterialORM";
import {MaterialQuantityLogModelCreateOneSchema} from "@/prisma/generated/schemas";
import {MaterialHistoryExport, MaterialLogExport, UserDataExport} from "@/utils/types/export/types";

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

    public static async insertUserDataExport(data: UserDataExport) {
        const inserts = []
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
        // TODO: Update if ID provided
        return this.getPrisma().create({
            data: {
                atTime: data.atTime,
                quantityTotal: data.quantityTotal,
                quantityChange: data.quantityTotal,
                comment: data.comment,
                importTime: data.importTime,
                idUser,
                idMaterial,
                idNextLog,
                idPreviousLog
            }
        })
    }

    private static link(idLog: string) {
        //TODO
    }
}

export enum LogOrderType {
    noOrder,
    oldestToNewest,
    newestToOldest,
}