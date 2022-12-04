import style from './CSS/theme.module.scss';
import {Row} from "react-bootstrap";
import classNames from "classnames";

export function SectionTitle(props: { title: string }) {
    return <div className={"row"}>
        <h1 className={classNames(style.sectionTitle, "text-2xl")}>{props.title}</h1>
    </div>
}

export function PageTitle(props: { title: string }) {
    return <div className={"row"}>
        <h1 className={style.pageTitle}>
            <b>⪡ {props.title} ⪢</b>
        </h1>
    </div>
}