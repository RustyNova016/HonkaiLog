import {NextApiRequest, NextApiResponse} from "next";
import {z} from "zod";
import {HoyoverseAPI} from "@/lib/External APIs/Hoyoverse/HoyoverseAPI";
import {getAPISideUserOrThrow} from "@/lib/NextAuth/GetSession";
import {HoyoverseImportORM} from "@/prisma/ORMs/HoyoverseImportORM";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const idUser = getAPISideUserOrThrow(req, res).then(value => value.id)
    const query = req.query;
    const parse = z.string().safeParse(query["authkey"])


    if (!parse.success) {
        res.status(400).json("No authKey");
        return
    }

    const authKey: string = parse.data.replaceAll(" ", "+")
    const hoyoData = HoyoverseAPI.fetchCrystalLogs(authKey)

    const logsInserted = await HoyoverseImportORM.insertCrystalImport(await hoyoData, await idUser)
    res.status(200).json({logsInserted: logsInserted});
}

