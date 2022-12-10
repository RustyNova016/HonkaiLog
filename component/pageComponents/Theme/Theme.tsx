import style from './CSS/theme.module.scss';
import classNames from "classnames";

export function SectionTitle(props: { title: string }) {
    return <h1 className={classNames(style.sectionTitle, "text-4xl")}>{props.title}</h1>
}

export function PageTitle(props: { title: string }) {
    return <div className={"row"}>
        <h1 className={style.pageTitle}>
            <b>⪡ {props.title} ⪢</b>
        </h1>
    </div>
}