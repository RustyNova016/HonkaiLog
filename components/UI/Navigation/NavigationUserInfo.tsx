"use client"; // useSession
import {useSession} from "next-auth/react";
import {LogIn} from "../../../component/Layout/Navigation";
import {NavbarAccountBadge} from "./NavbarAccountBadge";
import {z} from "zod";
import {LoadingIcon} from "../Loading/LoadingIcon";

export function NavigationUserInfo() {
    const {data: session, status} = useSession()

    // TODO: Prevent Navbar to expend when loading
    if (status === "loading") { return <LoadingIcon height={"1em"}/> }

    if (session === null) {
        return <><LogIn/></>;
    } else {
        const parsedSession = z.object({
            user: z.object({
                name: z.string(),
                image: z.string().optional()
            })
        }).parse(session)
        return <><NavbarAccountBadge name={parsedSession.user.name} image={parsedSession.user.image}/></>
    }
}