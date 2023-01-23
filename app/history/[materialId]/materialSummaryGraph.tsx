import {CanvasJSWithSSR} from "@/lib/CanvasJS/CanvasJSWithSSR";
import {MaterialLogCollection} from "@/utils/Objects/Material/MaterialLogCollection";
import {MaterialHistoryGrapher} from "@/utils/Objects/Material/MaterialHistoryGrapher";
import {Dayjs} from "dayjs";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {MaterialHistoryCalculator} from "@/utils/Objects/Material/MaterialHistoryCalculator";

export interface MaterialSummaryGraphProps {
    materialHistory: MaterialHistory
    startDate: Dayjs
}

export function MaterialSummaryGraph({materialHistory, startDate}: MaterialSummaryGraphProps) {
    const logs = materialHistory.getLogs()
    if(logs.getLogBeforeDate(startDate) !== undefined && logs.getLogAfterDate(startDate) !== undefined) {
        const splitLog = new MaterialHistoryCalculator(materialHistory).createSplitLog(startDate);
        if (splitLog !== undefined){
            logs.push(splitLog)
        }
    }

    const filteredLogs = logs.getLogsNewerThan(startDate)

    const dataPoints = new MaterialHistoryGrapher(filteredLogs).generateQuantityGraph();
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2",
        axisY: {
            title: filteredLogs.material.getName() + " quantity",
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