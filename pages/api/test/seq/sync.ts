import {NextApiRequest, NextApiResponse} from "next";
import sequelize from "../../../../models/SequelizeConnection";



export default async function sync(req: NextApiRequest, res: NextApiResponse) {
    try {
        await sequelize.authenticate();
        console.info('Connection has been established successfully.', "Database");
    } catch (error) {
        console.error('Unable to connect to the database: \n' + error, "Database");
    }


    await sequelize.sync({force: true});
    res.status(200).json("Done!")
}