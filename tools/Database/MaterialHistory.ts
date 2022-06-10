import {IMaterialCountAPIResponse} from "../../pages/api/material/count/[id]";
import {toTimestamp} from "../miscs";
import {Serie} from "@nivo/line";
import {MaterialHistoryLog} from "./MaterialHistoryLog";
import {GraphType} from "../../component/pages/History/DataCharts";

export interface IMaterialHistory extends Omit<IMaterialCountAPIResponse, 'Material_logs'> {
    Material_logs: MaterialHistoryLog[];
}

export type DatumConstructor = (dateLowerBound: Date, dateUpperBound: Date) => LogDatum[]
export type LogDatum = {
    x: number;
    y: number;
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

    createCountGraphData(dateFrom?: Date, dateTo?: Date): Serie[] {
        let getCountDatum: DatumConstructor = (dateLowerBound, dateUpperBound) => {
            const countData: LogDatum[] = [];

            this.Material_logs.forEach((log) => {
                if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
                    countData.push(
                        {
                            x: toTimestamp(log.log_date),
                            y: log.count
                        }
                    )
                }
            })

            return countData;
        };

        return [this.createSeries("count", getCountDatum, dateFrom, dateTo)];
    }

    createSeries(name: string, data: DatumConstructor, dateFrom?: Date, dateTo?: Date): Serie {
        const dateLowerBound = dateFrom || this.getOldestLog().log_date;
        const dateUpperBound = dateTo || this.getLatestLog().log_date;

        return {
            id: name,
            data: data(dateLowerBound, dateUpperBound).sort((a, b) => a.x - b.x)
        }
    }

    getGraphData(graphType: GraphType, dateFrom?: Date, dateTo?: Date): Serie[] {
        switch (graphType) {
            case "count":
                return this.createCountGraphData(dateFrom, dateTo);
            default:
                return [];
        }
    }
}
