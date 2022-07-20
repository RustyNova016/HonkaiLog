import {UserRedirect} from "./userRedirect";
import {ReturnChildren} from "../../component/returnChildren";
import {PropsWithChildren} from "react";

export interface UserGateProps extends PropsWithChildren {
    userNeeded: boolean;
}

/** Redirect the user to a login page if needed */
export function RequireUser(props: UserGateProps) {
    if (props.userNeeded) {
        return <UserRedirect>
            <ReturnChildren {...props}/>
        </UserRedirect>
    } else {
        return <ReturnChildren {...props}/>
    }
}
