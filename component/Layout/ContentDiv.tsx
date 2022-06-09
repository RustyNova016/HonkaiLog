import {PropsWithChildren} from "react";
import styles from "./ContentDiv.module.scss";

interface IContentDivProps {
    top?: boolean;
    sides?: boolean;
}

function ContentDiv(props: PropsWithChildren<IContentDivProps>) {
    let classname = styles.contentDiv

    if (props.top) {
        classname += " " + styles.topBorder
    }
    if (props.sides) {
        classname += " " + styles.sideBorder
    }

    return (<div className={classname}>{props.children}</div>);
}

export default ContentDiv;
