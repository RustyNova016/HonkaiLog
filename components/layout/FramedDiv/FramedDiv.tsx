import styles from "./FramedDiv.module.scss";
import {PropsWithChildren} from "react";
import {PropsWithClass, PropsWithStyle} from "../../../tools/types";
import classNames from "classnames";
import {ReturnChildren} from "../../utils/returnChildren";

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
        <div className={classNames(ContentDivClasses)} style={props.style}>
                <ReturnChildren {...props}/>
        </div>
    );
}

export default FramedDiv;
