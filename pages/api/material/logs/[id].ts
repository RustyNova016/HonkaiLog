import {NextApiRequest, NextApiResponse} from "next";
import database from "../../../../database/database";
import {MaterialDBResponse} from "../../../../database/material";
import {MaterialLogDBResponse} from "../../../../database/material_log";
import {getAPIsideUser} from "../../../../database/user";
import {HttpStatusCode} from "../../../../tools/API/HttpStatusCodes";
import {getIDFromQuery} from "../../../../tools/API/getIDFromQuery";

export interface IMaterialLogsAPIResponse extends MaterialDBResponse {
    Material_logs: MaterialLogDBResponse[];
}

/** Return the logs for material with the given id */
export default async function MaterialCountAPIHandler(req: NextApiRequest, res: NextApiResponse) {
    const materialWithLogs = await database.Material.findOne({
        where: {
            id: getIDFromQuery(req, res)
        },
        include: {
            model: database.Material_log,
            required: false,
            where: {
                userId: await getAPIsideUser(req, res).then((user) => user.id)
            }
        }
    });

    if (materialWithLogs === null) {
        res.status(HttpStatusCode.Ok).json([]);
        return;
    } else {
        res.status(HttpStatusCode.Ok).json(materialWithLogs);
        return;
    }
}