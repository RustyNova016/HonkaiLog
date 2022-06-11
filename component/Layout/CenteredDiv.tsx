import classNames from "classnames";
import style from "./CSS/CenteredDiv.module.scss";

/** A component that centers its contents. */
export function CenteredDiv(props: {
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={classNames(style.centered, props.className)}>
            {props.children}
        </div>
    );
}
