import {z} from "zod";
import {MaterialORM} from "@/prisma/ORMs/MaterialORM";
import {getServerUser} from "@/lib/NextAuth/GetSession";
import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";
import dayjs from "dayjs";

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const materialHistory = await MaterialORM.getMaterialHistory(parsedParams.materialId, (await getServerUser()).id)
    const oldestLog = materialHistory.logCollection.getOldestLog();
    console.log("Num Logs", materialHistory.logCollection.logs.length)
    console.log("OldestLog: ", oldestLog)
    if(oldestLog !== null) {
        console.log("Prev to oldest", materialHistory.logCollection.getPreviousLog(oldestLog)),
            console.log("Found by id")
    }

    const calc = new MaterialHistoryCalculator(materialHistory, {period:{start: dayjs().add(-999999, "day"), end: dayjs()}})

    return <>{calc.calcNetGain()}</>
}