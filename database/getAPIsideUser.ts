import {NextApiRequest, NextApiResponse} from "next";
import {SessionUser} from "./sessionUser";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../pages/api/auth/[...nextauth]";
import {HttpStatusCode} from "../tools/API/HttpStatusCodes";

export async function getAPIsideUser(req: NextApiRequest, res: NextApiResponse): Promise<SessionUser> {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (session === null) {
        const error = new Error("No session found");
        res.status(HttpStatusCode.Unauthorized).json(error);
        throw error;
    }

    if (session.user === null || session.user === undefined) {
        const error1 = new Error("No user found");
        res.status(HttpStatusCode.Unauthorized).json(error1);
        throw error1;
    }

    return session.user;
}