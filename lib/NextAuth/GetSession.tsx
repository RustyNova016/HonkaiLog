import {getServerSession} from "next-auth";
import {z} from "zod";
import {NextApiRequest, NextApiResponse} from "next";
import {authOptions} from "./AuthOptions";

const SessionUserZod = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional()
})

export async function getServerUser() {
    const session = await getServerSession(authOptions);

    if (session === null) {throw new Error("Session is null. User isn't logged in")}
    if (session.user === null) {throw new Error("User is null. User isn't logged in")}

    return SessionUserZod.parse(session.user);
}

export async function getAPISideUserOrThrow(req: NextApiRequest, res: NextApiResponse) {
    const serverSession = await getServerSession(req, res, authOptions)

    if (serverSession === null) {throw new Error("Session is null. User isn't logged in")}
    if (serverSession.user === undefined) {throw new Error("User is null. User isn't logged in")}

    return serverSession.user
}

export async function getIdUserServer() {
    return (await getServerUser()).id
}