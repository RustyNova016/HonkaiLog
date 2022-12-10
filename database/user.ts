import sequelize from "../tools/Database/SequelizeConnection";
import {SequelizeTableCommonDBResults} from "../tools/Types";
import {DefaultUser, unstable_getServerSession} from "next-auth";
import {NextApiRequest, NextApiResponse} from "next";
import {HttpStatusCode} from "../tools/API/HttpStatusCodes";
import {authOptions} from "../pages/api/auth/[...nextauth]";
import database from "./database";

export interface UserDBResponse extends SequelizeTableCommonDBResults {
    id: string;
    name: string;
}

export type SessionUser = DefaultUser & { id: string };


export function associateUser(models: typeof database) {
    sequelize.models.user.hasMany(models.Material_logs, {
        foreignKey: 'userId'
    });
}

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