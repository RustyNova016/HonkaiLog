import {NextApiRequest, NextApiResponse} from "next";
import database from "../../../../database/database";
import {IMaterialDBResponse} from "../../../../database/material";
import {IMaterialLogDBResponse} from "../../../../database/material_log";

export interface IMaterialCountAPIResponse extends IMaterialDBResponse {
    Material_logs: IMaterialLogDBResponse[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let resu = await database.Material.findAll({
        where: {
            id: req.query?.id || 0
        },
        include: {
            model: database.Material_log,
            required: false,
            where: {
                userId: "1" //TODO: Get user ID from session
            }
        }
    });


    res.status(200).json(resu[0]);
}