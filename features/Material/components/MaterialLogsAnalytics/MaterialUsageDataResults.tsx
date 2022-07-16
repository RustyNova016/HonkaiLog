import {Material} from "../../../../tools/Models/Material";
import {MaterialLogsGraph} from "../../../../tools/MaterialLogsGraph";
import {NoDataErrorComponent} from "../../../../component/App Components/Errors/NoDataErrorComponent";
import {MaterialHistoryGraph} from "../../../../component/pages/History/MaterialHistoryGraph";
import {useMaterialFromContext} from "../../hooks/useMaterialFromContext";
import {LoadingComponent} from "../../../../component/App Components/PageLoadingComponent";
import {Row} from "react-bootstrap";

interface MaterialUsageDataResultsProps {
    graphType: "count" | "gains" | "averages";
    lowerDate: Date;
    material: Material;
    materialLogsGraph: MaterialLogsGraph;
    upperDate: Date;
}

export function MaterialUsageDataResults(props: MaterialUsageDataResultsProps) {
    // Get the material
    const material = useMaterialFromContext(true);
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    // Check if the material got logs
    const logs = material.logs;
    if (logs.getLogsBetween(props.lowerDate, props.upperDate).empty()) return <NoDataErrorComponent/>

    return <>
        <Row>
            <p>You gained {logs.getNetGainOfPeriod(props.lowerDate, props.upperDate)} {material.name} during this
                period,
                which is {logs.getAverageGainOfPeriod(props.lowerDate, props.upperDate)} {material.name} per day</p>

            <MaterialHistoryGraph
                series={props.materialLogsGraph.getGraphData(props.graphType, props.lowerDate, props.upperDate)}/>
        </Row>
    </>;
}