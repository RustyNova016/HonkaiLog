import styles from "./CSS/ContentDiv.module.scss";
import {CSSClassesProps, CSSStylesProps} from "../../tools/Types";
import {addCSSClasses} from "../../tools/Miscs";
import {PropsWithChildren} from "react";
import {ReturnChildren} from "../returnChildren";

export interface ContentDivProps extends PropsWithChildren, CSSClassesProps, CSSStylesProps {
    sides?: boolean;
    top?: boolean;
}

function ContentDiv(props: ContentDivProps) {
    const ContentDivClasses = [styles.ContentDiv];

    if (props.className !== undefined) { ContentDivClasses.push(props.className); }
    if (props.top) { ContentDivClasses.push(styles.topBorder); }
    if (props.sides) { ContentDivClasses.push(styles.sideBorder); }

    return (
        <div className={addCSSClasses(ContentDivClasses)} style={props.style}>
            <ReturnChildren {...props}/>
        </div>
    );
}

export default ContentDiv;
