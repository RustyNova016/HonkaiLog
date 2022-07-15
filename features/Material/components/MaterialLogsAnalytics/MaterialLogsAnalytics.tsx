import {useState} from "react";
import {removeDaysFromToday} from "../../../../tools/Miscs";
import {SectionTitle} from "../../../../component/pageComponents/Theme/Theme";
import ContentDiv from "../../../../component/Layout/ContentDiv";
import {MaterialLogsGraph} from "../../../../tools/MaterialLogsGraph";
import {MaterialUsageDataOptions} from "./MaterialUsageDataOptions";
import {MaterialUsageDataResults} from "./MaterialUsageDataResults";
import {useMaterialFromContext} from "../../hooks/useMaterialFromContext";
import {LoadingComponent} from "../../../../component/App Components/PageLoadingComponent";

export interface DataChartsProps {
}

export type GraphType = "count" | "gains" | "averages";

export function MaterialLogsAnalytics(props: DataChartsProps) {
    // Get the material
    const material = useMaterialFromContext(true);
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    const materialLogsGraph = new MaterialLogsGraph(material)
    const [lowerDate, setLowerDate] = useState<Date>(removeDaysFromToday(1));
    const [upperDate, setUpperDate] = useState(new Date());
    const [graphType, setGraphType] = useState<GraphType>("count");

    return <>
        <ContentDiv sides={true}>
            <SectionTitle title={"Material Usages"}></SectionTitle>
            <MaterialUsageDataOptions dateHook={setLowerDate} graphTypeHook={setGraphType}
                                      materialLogsGraph={materialLogsGraph}/>

            <MaterialUsageDataResults lowerDate={lowerDate} upperDate={upperDate} material={material}
                                      materialLogsGraph={materialLogsGraph} graphType={graphType}/>
        </ContentDiv>
    </>;
}