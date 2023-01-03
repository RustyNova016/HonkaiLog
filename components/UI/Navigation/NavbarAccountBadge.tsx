"use client";//TODO: Convert Server Component
import styles from "../../../component/Layout/CSS/Navigation.module.scss";
import {signOut} from "next-auth/react";
import {Avatar} from "primereact/avatar";
import {GLOBAL_COLORS} from "../../../component/Styling/GLOBAL_COLORS";
import classNames from "classnames";

export interface NavbarAccountBadgeProps {
    image?: string,
    name: string,
}

export function NavbarAccountBadge(props: NavbarAccountBadgeProps) {
    return <>
        <div className={"mx-1"}>
            {props.image ? (
                <span
                    style={{backgroundColor: GLOBAL_COLORS.navbar, backgroundImage: `url('${props.image}')`}}
                    className={styles.avatar}
                />
            ) : (
                <Avatar label="P"/>
            )}
        </div>
        <span className={classNames(styles.signedInText, "mx-1")}>
                <small>Signed in as</small>
                <br/>
                <strong className={"mx-1"}>{props.name}</strong>
                </span>
        <a
            href={`/api/auth/signout`}
            className={styles.button}
            onClick={(e) => {
                e.preventDefault()
                signOut()
            }}
        >
            Sign out
        </a>
    </>
}