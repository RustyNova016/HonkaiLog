import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";
import material_log from "../../../../database/material_log";
import {HttpStatusCode} from "../../../../tools/API/HttpStatusCodes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        console.log(req.body);
        if (req.body?.count === undefined) {
            res.status(422).json("No count value");
            return;
        }
        if (req.body?.MaterialId === undefined) {
            res.status(422).json("Unknown material");
            return;
        }

        const session = await getSession({req})
        if (session === null || session.user === undefined) {
            res.status(401).end();
            return;
        }

        const item = {
            count: req.body.count,
            log_date: new Date().toISOString(),
            materialId: req.body.MaterialId,
            userId: session.user.id
        }

        const dbItem = await material_log.create(item)

        res.status(HttpStatusCode.Ok).end()
    }
}