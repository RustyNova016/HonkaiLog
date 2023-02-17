import classNames from "classnames";
import style from "./CSS/CenteredDiv.module.scss";
import {CSSProperties} from "react";

/** A component that centers its contents. */
export function CenteredDiv(props: {
    children?: React.ReactNode;
    className?: string;
    style?: CSSProperties
}) {
    return (
        <div className={classNames(style["flexboxCentered"], props.className)} style={props.style}>
            {props.children}
        </div>
    );
}
