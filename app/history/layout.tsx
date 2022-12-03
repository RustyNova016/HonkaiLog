"use client";//TODO: Convert Server Component
// Session can be fetched serverside then passed down to the nav
import {PropsWithChildren} from "react";
import {SessionProvider} from "next-auth/react";
import {Navigation} from "../../components/UI/Navigation/Navigation";

export default function (props: PropsWithChildren) {
    return <>
        <SessionProvider>
            <Navigation/>
            {props.children}
        </SessionProvider>
    </>
}