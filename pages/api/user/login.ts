
import {NextApiRequest, NextApiResponse} from "next";
import User from "../../../database/user";

function handler(req: NextApiRequest, res: NextApiResponse) {
    const {username, password} = req.body;

    // Ask sequelize to find the user with the given username and password
    User.findOne({
        where: {
            name: username,
            password
        }
    }).then((user: any) => {
        // If the user is found, send a response with the user's data
        if (user) {
            console.log("USER FOUND");
            res.json(user);
        } else {
            // If the user is not found, send a response with an error message
            console.log("USER NOT FOUND");
            res.status(404).json({
                error: 'User not found'
            });
        }
    }).catch((err: { message: any; }) => {
        // If an error occurs, send a response with the error message
        console.log(err.message);
        res.status(500).json({
            error: err.message
        });
    });
}

export default handler;