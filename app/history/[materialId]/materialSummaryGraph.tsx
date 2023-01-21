import {CanvasJSWithSSR} from "@/lib/CanvasJS/CanvasJSWithSSR";
import {MaterialLogCollection} from "@/utils/Objects/MaterialLogCollection";
import {MaterialGrapher} from "@/utils/Objects/MaterialGrapher";
import {Dayjs} from "dayjs";

export interface MaterialSummaryGraphProps {
    logs: MaterialLogCollection,
    startDate: Dayjs
}

export function MaterialSummaryGraph({logs, startDate}: MaterialSummaryGraphProps) {
    if(logs.getLogBeforeDate(startDate) !== undefined && logs.getLogAfterDate(startDate) !== undefined) {
        const splitLog = logs.getAnalyser().createSplitLog(startDate);
        if (splitLog !== undefined){
            logs.push(splitLog)
        }
    }

    logs = logs.removeLogsOlderThan(startDate)

    const dataPoints = new MaterialGrapher(logs).generateQuantityGraph();
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2",
        axisY: {
            title: logs.material.getName() + " quantity",
            includeZero: false
        },
        axisX: {
            title: "date",
            prefix: "",
            interval: 2
        },
        data: [{
            type: "line",
            toolTipContent: "{x}: {y}",
            dataPoints: dataPoints
        }]
    }

    return (
        <div>
            <CanvasJSWithSSR options={options}/>
        </div>
    );
}