import {NextApiRequest, NextApiResponse} from "next";
import {getAPISideUserOrThrow} from "@/lib/NextAuth/GetSession";
import {MaterialQuantityLogORM} from "@/prisma/ORMs/MaterialQuantityLogORM";
import {MaterialHistoryData} from "@/utils/types/export/MaterialHistoryData";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const idUser = getAPISideUserOrThrow(req, res).then(value => value.id);
    console.log(req.body)
    const parse: MaterialHistoryData[] = req.body["histories"]

    const inserts = MaterialQuantityLogORM.insertUserDataExport({
        idUser: await idUser,
        materialHistories: parse
    })

    res.status(200).json({logsInserted: await inserts});
}