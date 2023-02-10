import {NextApiRequest, NextApiResponse} from "next";
import {z} from "zod";
import {HoyoverseAPI} from "@/lib/External APIs/Hoyoverse/HoyoverseAPI";
import {MaterialQuantityLogORM} from "../../../../prisma/ORMs/MaterialQuantityLogORM";
import {getAPISideUserOrThrow} from "@/lib/NextAuth/GetSession";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const parse = z.string(req.body.authKey).safeParse(query["authkey"])

    if (!parse.success) {
        res.status(400).json("No authKey");
        return
    }

    const authKey: string = parse.data
    const hoyoData = HoyoverseAPI.fetchCrystalLogs(authKey)

    const logsInserted = await MaterialQuantityLogORM.insertHoyoCrystalLogs((await hoyoData).list, (await getAPISideUserOrThrow(req, res)).id)
    res.status(200).json({logsInserted:logsInserted});
}

