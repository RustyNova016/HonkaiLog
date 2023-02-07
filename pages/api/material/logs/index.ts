import {NextApiRequest, NextApiResponse} from "next";
import {HttpStatusCode} from "../../../../tools/API/HttpStatusCodes";
import {getServerUser} from "@/lib/NextAuth/GetSession";
import prisma from "@/lib/prismadb";
import {MaterialQuantityCreateReq} from "@/utils/Objects/Material/validations/MaterialQuantityLog.JSONZod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        // Set entries
        const parsedBody = MaterialQuantityCreateReq.parse(req.body);
        const userId = getServerUser(req, res).then(value => value.id);

        // Insert the logs
        const resDB = await prisma.materialQuantityLog.create({
            data: {
                quantity: parsedBody.quantity,
                loggedAt: parsedBody.loggedAt,
                idMaterial: parsedBody.idMaterial,
                idUser: await userId
            }
        })

        res.status(HttpStatusCode.Ok).end()
    }
}