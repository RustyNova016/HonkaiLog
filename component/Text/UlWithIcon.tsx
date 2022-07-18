import {PropsWithChildren} from "react";
import styles from "./CSS/UlWithIcon.module.scss"

export function UlWithIcon(props: PropsWithChildren) {
    return <ul className={styles.ulWithIcon}>
        {props.children}
    </ul>
}

