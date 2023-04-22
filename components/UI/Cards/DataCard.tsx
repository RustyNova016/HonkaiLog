import classNames from "classnames";
import {className} from "postcss-selector-parser";
import {ReactNode} from "react";
import {PropsWithClass, PropsWithStyle} from "../../../tools/Types";
import externalStyle from "./DataCard.module.scss";

interface DataCardProps {
    accented: ReactNode;
    children: ReactNode;
    title: ReactNode;
}

export function DataCard(props: DataCardProps & PropsWithStyle & PropsWithClass) {
    return <div className={classNames(externalStyle["DataCard-Container"], props.className)} style={props.style}>
        <div className={externalStyle["leftSide"]}>
            <h5 className={externalStyle["title"]}>{props.title}</h5>
            <div className={externalStyle["Content"]}>{props.children}</div>
        </div>

        <div className={externalStyle["rightSide"]}>
            <div className={externalStyle["Accented"]}>{props.accented}</div>
        </div>
    </div>;
}