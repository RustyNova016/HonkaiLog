import {useContext, useState} from "react";
import {removeDaysFromToday} from "../../../../tools/Miscs";
import {SectionTitle} from "../../../../component/pageComponents/Theme/Theme";
import FramedDiv from "../../../../component/Layout/FramedDiv";
import {MaterialLogsGraph} from "../../../../tools/MaterialLogsGraph";
import {MaterialUsageDataOptions} from "./MaterialUsageDataOptions";
import {MaterialUsageDataResults} from "./MaterialUsageDataResults";
import {LoadingComponent} from "../../../../component/App Components/PageLoadingComponent";
import {TimeframeContext} from "../../../../context/TimeframeContext";
import {Row, Stack} from "react-bootstrap";
import {useMaterialWithLogsFromRouter} from "../../hooks/useMaterialWithLogsFromRouter";
import {MaterialHistorySummary} from "./MaterialHistorySummary";
import {TimeframeSelection} from "./TimeframeSelection";

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

    // Get the timeframe
    const {timeframe} = useContext(TimeframeContext);

    // Get the data
    const logs = material.logs.getLogsInTimeframe(timeframe)

    return <>
        <FramedDiv sides={true}>
            <Row>
                <Stack direction={"horizontal"}>
                    <SectionTitle title={"History Data"}/>
                    <TimeframeSelection className={"ms-auto"}/>
                </Stack>
            </Row>

            <Row>
                <MaterialHistorySummary logs={logs}/>
            </Row>


            <Row>
                <MaterialUsageDataOptions dateHook={setLowerDate} graphTypeHook={setGraphType}
                                          materialLogsGraph={materialLogsGraph}/>
            </Row>


            <MaterialUsageDataResults lowerDate={lowerDate} upperDate={upperDate} material={material}
                                      materialLogsGraph={materialLogsGraph} graphType={graphType}/>
        </FramedDiv>
    </>;
}

