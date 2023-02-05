import {LogIn} from "../../../component/Layout/Navigation";
import {NavbarAccountBadge} from "./NavbarAccountBadge";
import {z} from "zod";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";

export async function NavigationUserInfo() {
    const session = await unstable_getServerSession(authOptions)

    if (session === null) {return <LogIn/>;}

    const parsedSession = z.object({
        user: z.object({
            name: z.string(),
            image: z.string().optional()
        })
    }).parse(session)

    return <><NavbarAccountBadge name={parsedSession.user.name} image={parsedSession.user.image}/></>

}