import style from './CSS/theme.module.scss';
import classNames from "classnames";
import _ from "lodash";

export function SectionTitle(props: { title: string }) {
    return <h1 className={classNames(style.sectionTitle, "text-4xl")}>{_.startCase(props.title)}</h1>
}

export function PageTitle(props: { title: string }) {
    return <div className={"row"}>
        <h1 className={style.pageTitle}>
            <b>⪡ {_.startCase(props.title)} ⪢</b>
        </h1>
    </div>
}