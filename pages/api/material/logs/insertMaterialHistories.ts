import {NextApiRequest, NextApiResponse} from "next";
import {getAPISideUserOrThrow} from "@/lib/NextAuth/GetSession";
import {MaterialQuantityLogORM} from "@/prisma/ORMs/MaterialQuantityLogORM";
import {MaterialHistoryExport} from "@/utils/types/export/MaterialHistoryExport";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const idUser = getAPISideUserOrThrow(req, res).then(value => value.id);
    const parse: MaterialHistoryExport[] = req.body["histories"]

    const inserts = MaterialQuantityLogORM.insertUserDataExport({
        idUser: await idUser,
        MaterialHistory: parse
    })

    res.status(200).json({logsInserted: await inserts});
}