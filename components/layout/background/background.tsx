import {PropsWithChildren} from "react";
import styles from "./background.module.scss";

export function Background(props: PropsWithChildren) {
    return (
        <div className={styles.background}>
            {props.children}
        </div>
    )
}