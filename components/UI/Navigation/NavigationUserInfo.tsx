import {LogIn} from "../../../component/Layout/Navigation";
import {NavbarLoggedInStatus} from "./NavbarLoggedInStatus";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/NextAuth/AuthOptions";

export async function NavigationUserInfo() {
    const session = await getServerSession(authOptions)

    if (session !== null) {
        return <NavbarLoggedInStatus session={session}/>;
    }

    return <LogIn/>;
}