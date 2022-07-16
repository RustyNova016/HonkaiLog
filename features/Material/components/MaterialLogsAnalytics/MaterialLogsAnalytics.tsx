import {useState} from "react";
import {removeDaysFromToday} from "../../../../tools/Miscs";
import {SectionTitle} from "../../../../component/pageComponents/Theme/Theme";
import FramedDiv from "../../../../component/Layout/FramedDiv";
import {MaterialLogsGraph} from "../../../../tools/MaterialLogsGraph";
import {MaterialUsageDataOptions} from "./MaterialUsageDataOptions";
import {MaterialUsageDataResults} from "./MaterialUsageDataResults";
import {LoadingComponent} from "../../../../component/App Components/PageLoadingComponent";
import {TimeframeContextProvider} from "../../../../context/TimeframeContext";
import {Row} from "react-bootstrap";
import {TimeframeSelection} from "../../../../component/pages/History/TimeFrameSelect";
import {TimeframeDates} from "./TimeframeDates";
import {useMaterialWithLogsFromRouter} from "../../hooks/useMaterialWithLogsFromRouter";

export interface DataChartsProps {
}

export type GraphType = "count" | "gains" | "averages";

export function MaterialLogsAnalytics(props: DataChartsProps) {
    // Get the material
    const material = useMaterialWithLogsFromRouter();
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    const materialLogsGraph = new MaterialLogsGraph(material)
    const [lowerDate, setLowerDate] = useState<Date>(removeDaysFromToday(1));
    const [upperDate, setUpperDate] = useState(new Date());
    const [graphType, setGraphType] = useState<GraphType>("count");

    return <>
        <TimeframeContextProvider>
            <FramedDiv sides={true}>
                <SectionTitle title={"Material Usages"}></SectionTitle>

                <Row>
                    <TimeframeSelection/><p><TimeframeDates/></p>
                </Row>


                <Row>
                    <MaterialUsageDataOptions dateHook={setLowerDate} graphTypeHook={setGraphType}
                                              materialLogsGraph={materialLogsGraph}/>
                </Row>


                <MaterialUsageDataResults lowerDate={lowerDate} upperDate={upperDate} material={material}
                                          materialLogsGraph={materialLogsGraph} graphType={graphType}/>
            </FramedDiv>
        </TimeframeContextProvider>
    </>;
}