import classNames from "classnames";
import SectionTitleStyle from "./SectionTitle.module.scss";
import _ from "lodash";

export function SectionTitle(props: { title: string }) {
    return <h1 className={classNames(SectionTitleStyle['sectionTitle'])}>
        {_.startCase(props.title)}
    </h1>
}