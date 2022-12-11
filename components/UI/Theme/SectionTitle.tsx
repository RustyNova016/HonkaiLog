import classNames from "classnames";
import style from "../../../component/pageComponents/Theme/CSS/theme.module.scss";
import _ from "lodash";

export function SectionTitle(props: { title: string }) {
    return <h1 className={classNames(style.sectionTitle, "text-4xl")}>{_.startCase(props.title)}</h1>
}