import style from "../../../component/pageComponents/Theme/CSS/theme.module.scss";
import _ from "lodash";

export function PageTitle(props: { title: string }) {
    return <h1 className={style.pageTitle}>
        <b>⪡ {_.startCase(props.title)} ⪢</b>
    </h1>
}