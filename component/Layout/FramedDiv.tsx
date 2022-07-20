import styles from "./CSS/FramedDiv.module.scss";
import {PropsWithClass, PropsWithStyle} from "../../tools/Types";
import {addCSSClasses} from "../../tools/Miscs";
import {PropsWithChildren} from "react";
import {ReturnChildren} from "../returnChildren";
import {Container} from "react-bootstrap";

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
        <div className={addCSSClasses(ContentDivClasses)} style={props.style}>
            <Container>
                <ReturnChildren {...props}/>
            </Container>
        </div>
    );
}

export default FramedDiv;
