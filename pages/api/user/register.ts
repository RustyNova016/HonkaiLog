import {NextApiRequest, NextApiResponse} from "next";
import {SequelizeCRUD} from "../../../tools/CRUD/SequelizeCRUD";
import User from "../../../database/user";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("req: ", req.body);

    const CRUD = new SequelizeCRUD(User);
    let data1 = {
        name: req.body.name,
        password: req.body.password,
        canSeeAgeRestricted: 1
    };
    const data = CRUD.create(data1);
    res.status(200).json(data);
}