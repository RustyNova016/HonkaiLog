import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../../pages/api/auth/[...nextauth]";
import {z} from "zod";
import {NextApiRequest, NextApiResponse} from "next";

const SessionUserZod = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional()
})


export async function getServerSession(req?: NextApiRequest, res?: NextApiResponse) {
    if (req !== undefined && res !== undefined) {
        return await unstable_getServerSession(req, res, authOptions);
    } else {
        return await unstable_getServerSession(authOptions);
    }

}

export async function getServerUser(req?: NextApiRequest, res?: NextApiResponse) {
    const session = await getServerSession(req, res);

    if (session === null) {throw new Error("Session is null. User isn't logged in")}
    if (session.user === null) {throw new Error("User is null. User isn't logged in")}

    return SessionUserZod.parse(session.user);
}