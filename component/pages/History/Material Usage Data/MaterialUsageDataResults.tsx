import {Material} from "../../../../tools/Models/Material";
import {MaterialLogsGraph} from "../../../../tools/MaterialLogsGraph";
import {NoDataErrorComponent} from "../../../App Components/Errors/NoDataErrorComponent";
import {MaterialHistoryGraph} from "../MaterialHistoryGraph";

interface MaterialUsageDataResultsProps {
    graphType: "count" | "gains" | "averages";
    lowerDate: Date;
    material: Material;
    materialLogsGraph: MaterialLogsGraph;
    upperDate: Date;
}

export function MaterialUsageDataResults(props: MaterialUsageDataResultsProps) {
    // Check if the material got logs
    const material = props.material;
    const logs = material.logs;
    if (logs.getLogsBetween(props.lowerDate, props.upperDate).empty()) return <NoDataErrorComponent/>

    return <>
        <p>Showing data from the {props.lowerDate.toLocaleString()} to {props.upperDate.toLocaleString()}</p>

        <p>You gained {logs.getNetGainOfPeriod(props.lowerDate, props.upperDate)} {material.name} during this period,
            which is {logs.getAverageGainOfPeriod(props.lowerDate, props.upperDate)} {material.name} per day</p>

        <MaterialHistoryGraph
            series={props.materialLogsGraph.getGraphData(props.graphType, props.lowerDate, props.upperDate)}/>
    </>;
}