import {NextApiRequest, NextApiResponse} from "next";
import {HttpStatusCode} from "./HttpStatusCodes";
import {isNumericString} from "../NextAuth/tools";

export function getIDFromQuery(req: NextApiRequest, res: NextApiResponse): number {
    const id = req.query?.id;

    // TODO: Replace with Zod
    if (!isNumericString(id)) {
        res.status(HttpStatusCode.UnprocessableEntity).send("Invalid id");
        throw new Error("Invalid id");
    }

    return Number(id);
}