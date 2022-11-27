import classNames from "classnames";
import style from "./CenterContent.module.scss";

/** A components that centers its contents. */
export function CenterContent(props: {
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={classNames(style.flexboxCentered, props.className)}>
            {props.children}
        </div>
    );
}
