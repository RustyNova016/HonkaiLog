// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import database from "../../database/database";

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    database.User.findAll().then(users => {
        console.log(users)
    })
    res.status(200).json({name: 'John Doe'})
}
