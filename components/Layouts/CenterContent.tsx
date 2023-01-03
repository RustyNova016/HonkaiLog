import {PropsWithChildren} from "react";
import centerContentCSS from "./CenterContent.module.scss"

export function CenterContent(props: PropsWithChildren) {
    return <>
        <div className={centerContentCSS.centerContent}>
            {props.children}
        </div>
    </>
}

export function ScrollableArea(props: PropsWithChildren) {
    return <>
        <div style={{flex: 1, display: "flex", overflow: "auto", height: "inherit"}}>
            {props.children}
        </div>
    </>
}