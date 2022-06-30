import {useContext, useState} from "react";
import {removeDaysFromToday} from "../../../../tools/Miscs";
import {SectionTitle} from "../../../pageComponents/Theme/Theme";
import ContentDiv from "../../../Layout/ContentDiv";
import {MaterialLogsGraph} from "../../../../tools/MaterialLogsGraph";
import {MaterialContext} from "../../../Contexts/MaterialContext";
import {MaterialUsageDataOptions} from "./MaterialUsageDataOptions";
import {MaterialUsageDataResults} from "./MaterialUsageDataResults";

export interface DataChartsProps {
}

export type GraphType = "count" | "gains" | "averages";

export function MaterialUsageData(props: DataChartsProps) {
    // Get the material
    const material = useContext(MaterialContext)
    const materialLogsGraph = new MaterialLogsGraph(material)
    const [lowerDate, setLowerDate] = useState<Date>(removeDaysFromToday(1));
    const [upperDate, setUpperDate] = useState(new Date());
    const [graphType, setGraphType] = useState<GraphType>("count");

    return <>
        <ContentDiv sides={true}>
            <SectionTitle title={"Data Charts"}></SectionTitle>
            <MaterialUsageDataOptions dateHook={setLowerDate} graphTypeHook={setGraphType}
                              materialLogsGraph={materialLogsGraph}/>

            <MaterialUsageDataResults lowerDate={lowerDate} upperDate={upperDate} material={material}
                                   materialLogsGraph={materialLogsGraph} graphType={graphType}/>
        </ContentDiv>
    </>;
}