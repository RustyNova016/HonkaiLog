"use client"
import {PropsWithChildren} from "react";
import {SessionContext, SessionProvider} from "next-auth/react";
import {session} from "next-auth/core/routes";

export function SessionProviderWrapper(props: PropsWithChildren) {
    return <SessionProvider session={session()}>
        {props.children}
    </SessionProvider>
}