import {IMaterialCountAPIResponse} from "../../pages/api/material/count/[id]";
import {toTimestamp} from "../miscs";
import {Serie} from "@nivo/line";
import {MaterialHistoryLog} from "./MaterialHistoryLog";

export interface IMaterialHistory extends Omit<IMaterialCountAPIResponse, 'Material_logs'> {
    Material_logs: MaterialHistoryLog[];
}

export class MaterialHistory implements IMaterialHistory {
    Material_logs: MaterialHistoryLog[] = [];
    id: number;
    name: string;

    constructor(materialCount: IMaterialCountAPIResponse) {
        materialCount.Material_logs.map((log) => {
            this.Material_logs.push(new MaterialHistoryLog(log));
        })

        this.Material_logs.sort((a, b) => {
            return toTimestamp(a.log_date) - toTimestamp(b.log_date)
        })

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

