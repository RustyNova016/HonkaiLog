import React from "react";
import Link from "next/link";
import classNames from "classnames";

export function LinkAnimated(props: React.ComponentProps<typeof Link>) {
    return <Link className={classNames(props.className)} {...props}></Link>
}