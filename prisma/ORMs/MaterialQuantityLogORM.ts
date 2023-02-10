import prismadb from "@/lib/prismadb";
import {HoyoCrystalLog} from "@/utils/types/api/hoyoverse/crystals";
import {z} from "zod";
import {MaterialQuantityLogCreateOneSchema} from "../generated/schemas";
import dayjs from "dayjs";

export class MaterialQuantityLogORM {
    public static insertHoyoCrystalLog(log: HoyoCrystalLog, idUser: string) {
        console.log("Inserting log: ", log)

        return this.insert({
            data: {
                quantity: z.number().parse(parseInt(log.item[3].value)),
                idMaterial: 1,
                idUser,
                loggedAt: dayjs(z.string().parse(log.item[0].value)).toDate()
            }
        })
    }

    public static insertHoyoCrystalLogs(log: HoyoCrystalLog[], idUser: string) {
        const insertPromises = []

        for (const hoyoCrystalLog of log) {
            insertPromises.push(this.insertHoyoCrystalLog(hoyoCrystalLog, idUser));
        }

        return Promise.all(insertPromises)
    }

    private static getPrisma() {
        return prismadb.materialQuantityLog;
    }

    private static async insert(data: z.infer<typeof MaterialQuantityLogCreateOneSchema>) {
        //TODO: Check for existing logs
        //TODO: Add comment
        return this.getPrisma().create(data);
    }
}