"use client"; //TODO: Convert to Server Component
import styles from "./CSS/FramedDiv.module.scss";
import {PropsWithClass, PropsWithStyle} from "../../tools/Types";
import {PropsWithChildren} from "react";
import {ReturnChildren} from "../returnChildren";
import classNames from "classnames";

export interface FramedDivProps extends PropsWithChildren, PropsWithClass, PropsWithStyle {
    sides?: boolean;
    top?: boolean;
}

/** A fancy cyber styled box to display content */
function FramedDiv(props: FramedDivProps) {
    const ContentDivClasses = [styles.ContentDiv];

    if (props.className !== undefined) { ContentDivClasses.push(props.className); }
    if (props.top) { ContentDivClasses.push(styles.topBorder); }
    if (props.sides) { ContentDivClasses.push(styles.sideBorder); }

    return (
        <div className={classNames(ContentDivClasses, "flex flex-col")} style={props.style}>
            <ReturnChildren {...props}/>
        </div>
    );
}

export default FramedDiv;
