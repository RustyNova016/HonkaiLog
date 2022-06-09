import {IMaterialCountAPIResponse} from "../../pages/api/material/count/[id]";
import {IMaterialLogDBResponse} from "../../database/material_log";
import {toTimestamp} from "../miscs";
import {Serie} from "@nivo/line";
import {convertLogsToChartpoints} from "../Charts/ChartTools";

export class MaterialHistory implements IMaterialCountAPIResponse {
    Material_logs: IMaterialLogDBResponse[];
    id: number;
    name: string;

    constructor(materialCount: IMaterialCountAPIResponse) {
        // TODO create log class
        this.Material_logs = materialCount.Material_logs.sort((a: IMaterialLogDBResponse, b: IMaterialLogDBResponse) => {
            return toTimestamp(a.log_date) - toTimestamp(b.log_date)
        });
        this.id = materialCount.id;
        this.name = materialCount.name;
    }

    getCurrentCount(): number {
        return this.getLatestLog().count;
    }

    getLatestLog() {
        return this.Material_logs[this.Material_logs.length - 1];
    }

    getOldestLog() {
        return this.Material_logs[0];
    }

    createChartData(dateFrom?: Date, dateTo?: Date): Serie[] {
        const dateLowerBound = dateFrom || new Date(this.getOldestLog().log_date);
        const dateUpperBound = dateTo || new Date(this.getLatestLog().log_date);
        const countData: { x: number, y: number }[] = [];

        this.Material_logs.forEach((log) => {
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
}