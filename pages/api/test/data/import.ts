import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prismadb";
import {HttpStatusCode} from "@/utils/enums/HttpStatusCodes";
import {convertHonkaiLogv1Datasource, honkaiLogV1Data} from "../../../../data/Datasource1";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let i = 1;
    for (const honkaiLogV1Datum of honkaiLogV1Data) {
        console.log("Processing", i, "/", honkaiLogV1Data.length)
        const parsed = convertHonkaiLogv1Datasource(honkaiLogV1Datum);

        if (parsed !== null) {
            const resDB = await prisma.materialQuantityLog.create({
                    data: parsed
                }
            )
        }
        i += 1;
    }

    res.status(HttpStatusCode.Ok).end()

}