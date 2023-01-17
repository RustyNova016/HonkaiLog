import {NextApiRequest, NextApiResponse} from "next";
import database from "../../../../database/database";
import {MaterialDBResponse} from "../../../../database/material";
import {MaterialLogItemJSON} from "../../../../database/material_logs";
import {getAPIsideUser} from "../../../../database/user";
import {HttpStatusCode} from "../../../../tools/API/HttpStatusCodes";
import {getIDFromQuery} from "../../../../tools/API/getIDFromQuery";
import {z} from "zod";
import {MaterialLogFetchJSONZod} from "../../../../utils/Zod/Materials";

/** Response from the API for any fetching operation */
export interface MaterialLogsAPIFetchResponse extends MaterialDBResponse {
    Material_logs: MaterialLogItemJSON[];
}

/** Return the logs for logs with the given id */
export default async function MaterialCountAPIHandler(req: NextApiRequest, res: NextApiResponse) {
    const materialWithLogs = await database.Material.findOne({
        where: {
            id: getIDFromQuery(req, res)
        },
        include: {
            model: database.Material_logs,
            required: false,
            where: {
                userId: await getAPIsideUser(req, res).then((user) => user.id)
            }
        }
    });

    console.log("Material: ", materialWithLogs)


    if (materialWithLogs === null) {
        res.status(500)
        return;
    } else {
        try {
            const materialLogJSON: z.infer<typeof MaterialLogFetchJSONZod> = {
                name: materialWithLogs.name
            };

            const parsedMaterialLogJSON = MaterialLogFetchJSONZod.parse(materialLogJSON)
            res.status(HttpStatusCode.Ok).json(materialLogJSON);
        } catch (e) {
            res.status(500)
        }
        return;
    }
}