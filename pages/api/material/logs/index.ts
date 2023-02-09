import {NextApiRequest, NextApiResponse} from "next";
import {HttpStatusCode} from "../../../../tools/API/HttpStatusCodes";
import prisma from "@/lib/prismadb";
import {MaterialQuantityCreateReq} from "@/utils/Objects/Material/validations/MaterialQuantityLog.JSONZod";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/NextAuth/AuthOptions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        // Set entries
        const userId = getServerSession(req, res, authOptions).then(value => value?.user?.id)
        const parsedBody = MaterialQuantityCreateReq.parse(req.body);

        if (await userId === undefined) {
            res.status(HttpStatusCode.Unauthorized).end()
        }

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