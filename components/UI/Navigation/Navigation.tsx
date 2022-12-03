import {NavigationUserInfo} from "./NavigationUserInfo";
import {CSSProperties} from "react";
import Link from "next/link";
import {ROUTES} from "../../../utils/globals/routes";

export function Navigation() {
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height: "5vh"}}>
            <div className="container-fluid">
                <Link href={ROUTES.home} className={"navbar-brand"}>HonkaiLog</Link>

                <div className={"btn btn-outline-primary inline-flex items-center"}>
                    <NavigationUserInfo/>
                </div>
            </div>
        </nav>
    </>;
}

const style: CSSProperties = {
    paddingLeft: "20",
    paddingRight: "20",
    width: ""
}