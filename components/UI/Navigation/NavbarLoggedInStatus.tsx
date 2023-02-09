"use client";//TODO: Convert Server Component
import {signOut} from "next-auth/react";
import classNames from "classnames";
import {z} from "zod";
import {Session} from "next-auth";
import NavbarStyles from "@/components/UI/Navigation/Navigation.module.scss";
import Image from "next/image";

export interface NavbarLoggedInStatusProps {
    session: Session
}

export function NavbarLoggedInStatus({session}: NavbarLoggedInStatusProps) {
    const parsedSession = z.object({
        user: z.object({
            name: z.string(),
            image: z.string().optional()
        })
    }).parse(session).user

    return <>
        <p className={NavbarStyles["separator"]}></p>

        <span className={NavbarStyles["Link"]}>{parsedSession.name}</span>

        <div className={NavbarStyles["LogoContainer"]}>
            {/*TODO: No avatar icon*/}
            <Image src={parsedSession.image ? parsedSession.image : "parsedSession.image"} alt={""} height={100}
                   width={100}/>
        </div>

        <a
            href={`/api/auth/signout`} className={classNames(NavbarStyles["Link"], NavbarStyles["NavLinkAnimation"])}
            onClick={(e) => {
                e.preventDefault();
                signOut()
            }}>
            Sign out
        </a>
    </>
}