import {ChildrenProps} from "../../tools/Types";
import {signIn, useSession} from "next-auth/react";
import {PageLoadingComponent} from "./PageLoadingComponent";

/** Component that redirect the user if it isn't authentificated */
export function UserRedirect(props: ChildrenProps): JSX.Element {
    const session = useSession();

    if (session.status === "unauthenticated") {
        signIn()
        return <></>
    }
    if (session.status === "loading") return <PageLoadingComponent subtext={"Getting user..."}/>;

    return props.children || <></>
}