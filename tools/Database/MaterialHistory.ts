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

    getGraphData(graphType: GraphType, dateFrom?: Date, dateTo?: Date): Serie[] {
        switch (graphType) {
            case "count":
                return this.generateCountGraphData(dateFrom, dateTo);

            case "gains":
                return this.generateAnalyticGraphData(dateFrom, dateTo);

            default:
                return [];
        }
    }

    /** Returns the timeframe of the history. If no date is given, the timeframe is from the oldest log to the latest log.*/
    private getTimeframe(dateFrom: Date | undefined, dateTo: Date | undefined) {
        const dateLowerBound = dateFrom || this.getOldestLog().log_date;
        const dateUpperBound = dateTo || this.getLatestLog().log_date;
        return {dateLowerBound, dateUpperBound};
    }

    private generateCountGraphData(dateFrom?: Date, dateTo?: Date): Serie[] {
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

    private createSeries(name: string, data: DatumConstructor, dateFrom?: Date, dateTo?: Date): Serie {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return {
            id: name,
            data: data(dateLowerBound, dateUpperBound).sort((a, b) => a.x - b.x)
        }
    }

    private generateAnalyticGraphData(dateFrom?: Date, dateTo?: Date): Serie[] {
        const generateDeltaDatum: DatumConstructor = (dateLowerBound, dateUpperBound) => {
            const deltaData: LogDatum[] = [];

            this.Material_logs.forEach((log, index) => {
                if (index === 0) {
                    return;
                }

                if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
                    deltaData.push(
                        {
                            x: toTimestamp(log.log_date),
                            y: MaterialHistoryLog.getDelta(this.Material_logs[index - 1], log)
                        }
                    )
                }
            })

            return deltaData;
        }
        const generateGainDatum: DatumConstructor = (dateLowerBound, dateUpperBound) => {
            const gainData: LogDatum[] = [];

            this.Material_logs.forEach((log, index) => {
                if (index === 0) {
                    return;
                }

                if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
                    let delta = MaterialHistoryLog.getDelta(this.Material_logs[index - 1], log);
                    if (delta < 0) {
                        delta = 0;
                    }

                    gainData.push(
                        {
                            x: toTimestamp(log.log_date),
                            y: delta
                        }
                    )
                }
            })

            return gainData;
        }
        const generateLossDatum: DatumConstructor = (dateLowerBound, dateUpperBound) => {
            const lossData: LogDatum[] = [];

            this.Material_logs.forEach((log, index) => {
                if (index === 0) {
                    return;
                }

                if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
                    let delta = MaterialHistoryLog.getDelta(this.Material_logs[index - 1], log);
                    if (delta > 0) {
                        delta = 0;
                    }

                    lossData.push(
                        {
                            x: toTimestamp(log.log_date),
                            y: delta
                        }
                    )
                }
            })

            return lossData;
        }

        return [
            this.createSeries("Delta", generateDeltaDatum, dateFrom, dateTo),
            this.createSeries("Gains", generateGainDatum, dateFrom, dateTo),
            this.createSeries("Losses", generateLossDatum, dateFrom, dateTo),
        ];
    }
}
