import styles from "./CSS/ContentDiv.module.scss";
import {ChildrenProps, CSSClassesProps, CSSStylesProps} from "../../tools/Types";
import {addCSSClasses} from "../../tools/Miscs";

export interface ContentDivProps extends ChildrenProps, CSSClassesProps, CSSStylesProps {
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
            {props.children}
        </div>
    );
}

export default ContentDiv;
