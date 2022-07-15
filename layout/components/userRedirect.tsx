import {signIn, useSession} from "next-auth/react";
import {PageLoadingComponent} from "../../component/App Components/PageLoadingComponent";
import {PropsWithChildren} from "react";
import {ReturnChildren} from "../../component/returnChildren";


/** Component that redirect the user if they aren't authenticated */
export function UserRedirect(props: PropsWithChildren) {
    const session = useSession();

    if (session.status === "unauthenticated") {
        signIn()
        return <></>
    }

    if (session.status === "loading") return <PageLoadingComponent subtext={"Getting user..."}/>;

    return <ReturnChildren {...props}/>
}