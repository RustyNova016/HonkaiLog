import {NavigationUserInfo} from "./NavigationUserInfo";
import {CSSProperties, Suspense} from "react";
import Link from "next/link";
import {ROUTESOLD} from "../../../utils/globals/ROUTESOLD";
import styles from "../../../component/Layout/CSS/Navigation.module.scss";
import Image from "next/image";
import {globalColors} from "../../../component/Styling/globalColors";

export function Navigation() {
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height: "5vh"}}>
            <div className="container-fluid">
                <div className={"flex flex-row"}>
                    <div className={styles.avatar} style={{backgroundColor: globalColors.navbar}}>
                        <Image src={"/images/icons/HonkaiCube.png"} alt={""} height={100} width={100}/>
                    </div>
                    <div className={"flex align-middle navbar-brand text-center mx-2"}>
                        <Link href={ROUTESOLD.home} style={{height: "inherit"}}
                              className={"navbar-brand p-0 text-center"}>
                            <span className={"text-2xl"}>HonkaiLog</span>
                        </Link>
                    </div>

                </div>

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