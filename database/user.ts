import sequelize from "../tools/Database/SequelizeConnection";
import {database} from "./database";
import {SequelizeTableCommonDBResults} from "../tools/Types";
import {DefaultUser} from "next-auth";
import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";
import {HttpStatusCode} from "../tools/API/HttpStatusCodes";

export interface UserDBResponse extends SequelizeTableCommonDBResults {
    id: number;
    name: string;
}

export type SessionUser = DefaultUser & { id: string };


export function associateUser(models: typeof database) {
    sequelize.models.user.hasMany(models.Material_log, {
        foreignKey: 'userId'
    });
}

export async function getAPIsideUser(req: NextApiRequest, res: NextApiResponse): Promise<SessionUser> {
    const session = await getSession({req})

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