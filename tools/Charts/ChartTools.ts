import {Serie} from "@nivo/line";
import {toTimestamp} from "../miscs";
import {IMaterialCountAPIResponse} from "../../pages/api/material/count/[id]";

export function convertLogsToChartpoints(logs: IMaterialCountAPIResponse, dateLowerBound: Date, dateUpperBound: Date) {
    const countData: { x: number, y: number }[] = [];

    logs.Material_logs.forEach((log) => {
        if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
            countData.push({
                x: toTimestamp(log.log_date),
                y: log.count
            })
        }
    })

    return [{
        id: "count",
        data: countData.sort((a, b) => a.x - b.x)
    }]
}

export function getChartData(logs: IMaterialCountAPIResponse, dateFrom?: Date, dateTo?: Date): Serie[] {
    const dateLowerBound = dateFrom || new Date(logs.Material_logs[0].log_date);
    const dateUpperBound = dateTo || new Date(logs.Material_logs[logs.Material_logs.length - 1].log_date);


    return convertLogsToChartpoints(logs, dateLowerBound, dateUpperBound);
}