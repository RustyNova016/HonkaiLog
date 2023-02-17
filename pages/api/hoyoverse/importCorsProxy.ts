import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {HoyoAPIResponse} from "@/lib/External APIs/Hoyoverse/HoyoAPIResponse";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const body = req.body

    const response = await axios.get<HoyoAPIResponse>(
            "https://sg-public-api.hoyoverse.com/common/bh3_self_help_query/UserMaterialQuery/" + body.url,
            {
                params: {
                    authkey_ver: 1,
                    sign_type: 2,
                    pageSize: 30,
                    page: body.page,
                    authkey: body.authkey,
                    ...body.urlParams
                }
            })

    res.json(response.data)
}