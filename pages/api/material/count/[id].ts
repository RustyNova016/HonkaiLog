import {NextApiRequest, NextApiResponse} from "next";
import database from "../../../../database/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let resu = await database.Material.findAll({
        where: {
            id: "1" //TODO: Get material ID from req.query
        },
        include: {
            model: database.Material_log,
            where: {
                userId: "1" //TODO: Get user ID from session
            }
        }
    });


    res.status(200).json(resu);
}