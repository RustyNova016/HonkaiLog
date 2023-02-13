import prismadb from "@/lib/prismadb";
import {HoyoCrystalLogData} from "@/utils/types/api/hoyoverse/FetchHoyoCrystalLogRes";
import {MaterialQuantityLogORM} from "@/prisma/ORMs/MaterialQuantityLogORM";
import dayjs from "dayjs";

export class HoyoverseImportORM {
    public static async insertCrystalImport(data: HoyoCrystalLogData, idUser: string) {
        const importLog = await this.findOrNew(idUser, dayjs(data.lastUpdateTime).toDate())

        return await MaterialQuantityLogORM.insertHoyoCrystalLogs(data.list, idUser, importLog.id)
    }

    private static async create(idUser: string, serverUpdateTime: Date) {
        return this.getPrisma().create({
            data: {
                idUser,
                serverUpdateTime
            }
        })
    }

    private static async findByDate(idUser: string, serverUpdateTime: Date) {
        return this.getPrisma().findUnique({
            where: {
                serverUpdateTime_idUser: {
                    idUser,
                    serverUpdateTime
                }
            }
        })
    }

    private static async findOrNew(idUser: string, serverUpdateTime: Date) {
        const foundImport = await this.findByDate(idUser, serverUpdateTime);

        if(foundImport !== null) {
            return foundImport
        }

        return this.create(idUser, serverUpdateTime)
    }

    private static getPrisma() {
        return prismadb.hoyoverseImportModel;
    }
}