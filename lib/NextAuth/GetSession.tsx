import {getServerSession, unstable_getServerSession} from "next-auth";
import {z} from "zod";
import {NextApiRequest, NextApiResponse} from "next";
import {authOptions} from "./AuthOptions";

const SessionUserZod = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional()
})


export async function getServerSessionMiddleware(req?: NextApiRequest, res?: NextApiResponse) {
    if (req !== undefined && res !== undefined) {
        return await getServerSession(req, res);
    } else {
        return await getServerSession();
    }

}

export async function getServerUser() {
    const session = await getServerSession(authOptions);

    if (session === null) {throw new Error("Session is null. User isn't logged in")}
    if (session.user === null) {throw new Error("User is null. User isn't logged in")}

    return SessionUserZod.parse(session.user);
}

export async function getServerUserFromRequest(req?: NextApiRequest, res?: NextApiResponse) {
    const session = await getServerSessionMiddleware(req, res);

    if (session === null) {throw new Error("Session is null. User isn't logged in")}
    if (session.user === null) {throw new Error("User is null. User isn't logged in")}

    return SessionUserZod.parse(session.user);
}