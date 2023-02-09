import {NavigationUserInfo} from "./NavigationUserInfo";
import {Suspense} from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarStyles from "./Navigation.module.scss"
import classNames from "classnames";
import {LoadingIcon} from "@/components/UI/Loading/LoadingIcon";

export function Navigation() {
    return <>
        <div className={NavbarStyles["NavbarStyle"]}>
            <div className={NavbarStyles["section"]}>
                <div className={NavbarStyles["section"]}>
                    <div className={NavbarStyles["LogoContainer"]}>
                        <Image src={"/images/icons/HonkaiCube.png"} alt={""} height={100} width={100}/>
                    </div>
                    <Link className={classNames(NavbarStyles["Brand"], NavbarStyles["NavLinkAnimation"])}
                          href={"/"}>HonkaiLog</Link>
                    <p className={NavbarStyles["separator"]} style={{marginLeft: "20px"}}></p>
                </div>


                <Link className={classNames(NavbarStyles["Link"], NavbarStyles["NavLinkAnimation"])} href={"/history"}>Material
                    History</Link>
                <Link className={classNames(NavbarStyles["Link"], NavbarStyles["NavLinkAnimation"])}
                      href={"/gacha"}>Gacha</Link>
                <Link className={classNames(NavbarStyles["Link"], NavbarStyles["NavLinkAnimation"])}
                      href={"/battlepass"}>Battle Pass</Link>
            </div>

            <div className={NavbarStyles["section"]}>
                <Suspense fallback={<LoadingIcon/>}>
                    {/* @ts-expect-error Server Component */}
                    <NavigationUserInfo/>
                </Suspense>
            </div>
        </div>
    </>
}
