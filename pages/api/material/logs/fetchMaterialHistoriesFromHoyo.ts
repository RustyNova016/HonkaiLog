import {NextApiRequest, NextApiResponse} from "next";
import {z} from "zod";
import {HoyoverseAPI} from "@/lib/External APIs/Hoyoverse/HoyoverseAPI";
import {HoyoAPITypes} from "@/lib/External APIs/Hoyoverse/ApiTypes";
import {MaterialHistoryConverters} from "@/utils/entities/Material/history/MaterialHistoryConverters";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const parse = z.string().safeParse(query["authkey"])

    if (!parse.success) {
        res.status(400).json("No authkey");
        return
    }

    const authKey: string = parse.data.replaceAll(" ", "+")

    const ApiResponses = HoyoverseAPI.fetchAPIs(HoyoAPITypes, authKey);
    const materialHistories = MaterialHistoryConverters.APIResArray_To_MaterialHistoryExports(await ApiResponses, idUser)

    res.status(200).json({histories: materialHistories});
}
