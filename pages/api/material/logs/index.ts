import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";
import material_log from "../../../../database/material_logs";
import {HttpStatusCode} from "../../../../tools/API/HttpStatusCodes";
import {MaterialDBResponse} from "../../../../database/material";
import {UserDBResponse} from "../../../../database/user";

interface MaterialLogCreateJSON {
    count: number;
    createdAt?: string;
    id?: number;
    log_date: string;
    materialId: MaterialDBResponse["id"];
    updatedAt?: string;
    userId: UserDBResponse["id"];
}

interface MaterialLogAPIPost {
    count?: any;
    createdAt?: any;
    id?: any;
    log_date?: any;
    materialId?: any;
    updatedAt?: any;
    userId?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        let material: MaterialLogAPIPost = {
            id: req.body?.id,
            count: req.body?.count,
            log_date: req.body?.log_date,
            materialId: req.body?.materialId,
            userId: req.body?.userId,
            createdAt: req.body?.createdAt,
            updatedAt: req.body?.updatedAt,
        }

        switch (typeof material.id) {
            case "number":
                break;
            case "undefined":
                break;
            case "string":
                const id = parseInt(material.id)
                if (!isNaN(id)) {
                    material.id = id
                    break;
                } else {
                    res.status(422).json("Invalid ID");
                    return;
                }
            default:
                res.status(422).json("Invalid ID");
                return;
        }

        switch (typeof material.count) {
            case "number":
                break;
            case "string":
                const count = parseInt(material.count)
                if (!isNaN(count)) {
                    material.count = count
                    break;
                } else {
                    res.status(422).json("Invalid Count");
                    return;
                }
            default:
                res.status(422).json("Invalid Count");
                return;
        }

        switch (typeof material.log_date) {
            case "string":
                break;
            case "undefined":
                material.log_date = new Date().toISOString()
                break;
            default:
                res.status(422).json("Invalid log_date");
                return
        }


        switch (typeof material.materialId) {
            case "number":
                break;
            default:
                res.status(422).json("Invalid materialId");
                return
        }


        switch (typeof material.userId) {
            case "string":
                break;

            case "undefined":
                const session = await getSession({req})
                if (session === null || session.user === undefined) {
                    res.status(401).end();
                    return;
                }
                material.userId = session.user.id
                break;

            default:
                res.status(422).json("Invalid userId");
                return
        }

        switch (typeof material.createdAt) {
            case "string":
                break;
            case "undefined":
                material.createdAt = new Date().toISOString()
                break;
            default:
                res.status(422).json("Invalid createdAt");
                return
        }

        switch (typeof material.updatedAt) {
            case "string":
                break;
            case "undefined":
                material.updatedAt = new Date().toISOString()
                break;
            default:
                res.status(422).json("Invalid updatedAt");
                return
        }

        const validJSON: MaterialLogCreateJSON = {
            count: material.count,
            id: material.id,
            createdAt: material.createdAt,
            log_date: material.log_date,
            materialId: material.materialId,
            userId: material.userId,
            updatedAt: material.updatedAt
        }


        const dbItem = await material_log.create(validJSON)
        res.status(HttpStatusCode.Ok).end()
    }
}