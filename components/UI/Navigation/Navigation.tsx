import {NavigationUserInfo} from "./NavigationUserInfo";
import {CSSProperties, Suspense} from "react";
import Link from "next/link";
import {ROUTESOLD} from "../../../utils/globals/ROUTESOLD";

export function Navigation() {
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height: "5vh"}}>
            <div className="container-fluid">
                <Link href={ROUTESOLD.home} className={"navbar-brand"}>HonkaiLog</Link>
                <Suspense fallback={<p>Loading User...</p>}>
                    <div className={"inline-flex items-center"}>
                        <NavigationUserInfo/>
                    </div>
                </Suspense>
            </div>
        </nav>
    </>;
}

const style: CSSProperties = {
    paddingLeft: "20",
    paddingRight: "20",
    width: ""
}