import React from "react";
import Link from "next/link";
import classNames from "classnames";
import LinkButtonStyle from "./LinkButton.module.scss"

export function LinkButton(props: React.ComponentProps<typeof Link>) {
    return <Link className={
        classNames(
            LinkButtonStyle["LinkButton"],
            props.className
        )
    } {...props}>

    </Link>
}