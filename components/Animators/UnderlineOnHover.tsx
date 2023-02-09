import {PropsWithChildren} from "react";
import UnderlineOnHoverStyle from "./UnderlineOnHover.module.scss"

export function UnderlineOnHover(props: PropsWithChildren) {
    return <span className={UnderlineOnHoverStyle["underlineOnHover"]}>{props.children}</span>
}