import {NavigationUserInfo} from "./NavigationUserInfo";
import {CSSProperties, Suspense} from "react";
import Link from "next/link";
import {ROUTESOLD} from "@/utils/globals/ROUTESOLD";
import styles from "../../../component/Layout/CSS/Navigation.module.scss";
import Image from "next/image";
import {GLOBAL_COLORS} from "../../../component/Styling/GLOBAL_COLORS";
import NavbarStyles from "./navigation.module.scss"
import classNames from "classnames";

export function NavigationV2() {
    return <>
        <div className={NavbarStyles["NavbarStyle"]}>
            <div className={NavbarStyles["left"]}>
                <div className={NavbarStyles["left"]}>
                    <div className={NavbarStyles["LogoContainer"]}>
                        <Image src={"/images/icons/HonkaiCube.png"} alt={""} height={100} width={100}/>
                    </div>
                    <Link className={classNames(NavbarStyles["Brand"], NavbarStyles["NavLinkAnimation"])}
                          href={"/"}>HonkaiLog</Link>
                    <p className={NavbarStyles["separator"]}></p>
                </div>


                <Link className={classNames(NavbarStyles["Link"], NavbarStyles["NavLinkAnimation"])} href={"/history"}>Material History</Link>
                <Link className={classNames(NavbarStyles["Link"], NavbarStyles["NavLinkAnimation"])} href={"/gacha"}>Gacha</Link>
                <Link className={classNames(NavbarStyles["Link"], NavbarStyles["NavLinkAnimation"])} href={"/battlepass"}>Battle Pass</Link>
            </div>
        </div>
    </>
}

export function Navigation() {
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={NavbarStyle}>
            <div className="container-fluid">
                <div className={"flex flex-row"}>
                    <div className={styles.avatar} style={{backgroundColor: GLOBAL_COLORS.navbar}}>
                        <Image src={"/images/icons/HonkaiCube.png"} alt={""} height={100} width={100}/>
                    </div>
                    <div className={"flex align-middle navbar-brand text-center mx-2"}>
                        <Link href={ROUTESOLD.home} style={{height: "inherit"}}
                              className={"navbar-brand p-0 text-center"}>
                            <span className={"text-2xl font-semibold montserrat"}>HonkaiLog</span>
                        </Link>
                    </div>

                    <div className={"nav-item navbar-nav me-auto mb-2 mb-lg-0 text-l"} style={{alignItems: "center"}}>
                        <Link className={"nav-link"} href={"/history"}><span>Material History</span></Link>
                        <Link className={"nav-link"} href={"/gacha"}><span>Gacha</span></Link>
                        <Link className={"nav-link"} href={"/battlepass"}><span>Battle Pass</span></Link>
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