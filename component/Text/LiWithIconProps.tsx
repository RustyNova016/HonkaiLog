import {ReturnChildren} from "../returnChildren";
import {PropsWithChildren} from "react";
import styles from "./CSS/LiWithIcon.module.scss"
import {PropsWithStyle} from "../../tools/Types";

export interface LiWithIconProps extends PropsWithChildren, PropsWithStyle {
    iconClass: string
}

export function LiWithIcon(props: LiWithIconProps) {
    return <li className={styles.liWithIcon}>
        <span><i className={props.iconClass} style={props.style}/><ReturnChildren {...props}/></span>
    </li>
}