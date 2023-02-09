import PageTitleStyle from "./PageTitle.module.scss";
import _ from "lodash";

export function PageTitle(props: { title: string }) {
    return <h1 className={PageTitleStyle["pageTitle"]}>
        <b>⪡ {_.startCase(props.title)} ⪢</b>
    </h1>
}