import {NextApiRequest, NextApiResponse} from "next";
import {z} from "zod";
import {HoyoverseAPI} from "@/lib/External APIs/Hoyoverse/HoyoverseAPI";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const parse = z.string().parse(query["authkey"]).replaceAll(" ", "+")

    res.status(200).json({
        submittedAuthKey: parse,
        test1: HoyoverseAPI.hoyourltest1(parse, 1),
        test2: HoyoverseAPI.hoyourltest2(parse, 1)
    })
}