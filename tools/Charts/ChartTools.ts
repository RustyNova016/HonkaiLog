import {IMaterialLogs} from "../../pages/api/material/count/[id]";
import {Datum, Serie} from "@nivo/line";

export function toTimestamp(strDate: string) {
    const datum = Date.parse(strDate);
    return datum;
}

export function convertLogsToChartpoints(logs: IMaterialLogs, dateLowerBound: Date, dateUpperBound: Date, countData: Datum[]) {
    logs.Material_logs.forEach(log => {
        if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
            countData.push({
                x: toTimestamp(log.log_date),
                y: log.count
            })
        }
    })

    return [{
        id: "count",
        data: countData
    }]
}

export function getChartData(logs: IMaterialLogs, dateFrom?: Date, dateTo?: Date): Serie[] {
    const countData: Datum[] = [];
    const dateLowerBound = dateFrom || new Date(logs.Material_logs[0].log_date);
    const dateUpperBound = dateTo || new Date(logs.Material_logs[logs.Material_logs.length - 1].log_date);


    return convertLogsToChartpoints(logs, dateLowerBound, dateUpperBound, countData);
}