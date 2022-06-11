import {IMaterialCountAPIResponse} from "../../pages/api/material/count/[id]";
import {toTimestamp} from "../miscs";
import {Serie} from "@nivo/line";
import {MaterialHistoryLog} from "./MaterialHistoryLog";
import {GraphType} from "../../component/pages/History/DataCharts";
import {MaterialHistoryLogCollection} from "./MaterialHistoryLogCollection";

export interface IMaterialHistory extends Omit<IMaterialCountAPIResponse, 'Material_logs'> {
    material_logs: MaterialHistoryLog[];
}

export type DatumConstructor = (dateLowerBound: Date, dateUpperBound: Date) => LogDatum[]
export type LogDatum = {
    x: number;
    y: number;
}

export class MaterialHistory extends MaterialHistoryLogCollection implements IMaterialHistory {
    id: number;
    name: string;

    constructor(materialCount: IMaterialCountAPIResponse) {
        super(MaterialHistoryLogCollection.DBResponseToLogCollection(materialCount.Material_logs));

        this.id = materialCount.id;
        this.name = materialCount.name;
    }

    getGraphData(graphType: GraphType, dateFrom?: Date, dateTo?: Date): Serie[] {
        switch (graphType) {
            case "count":
                return this.generateCountGraphData(dateFrom, dateTo);

            case "gains":
                return this.generateGainsGraphData(dateFrom, dateTo);

            case "averages":
                return this.generateAveragesGraphData(dateFrom, dateTo);

            default:
                return [];
        }
    }

    private createSeries(name: string, data: DatumConstructor, dateFrom?: Date, dateTo?: Date): Serie {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return {
            id: name,
            data: data(dateLowerBound, dateUpperBound).sort((a, b) => a.x - b.x)
        }
    }

    private generateAveragesGraphData(dateFrom?: Date, dateTo?: Date): Serie[] {
        const generateAverageDeltaDatum: DatumConstructor = (dateLowerBound, dateUpperBound) => {
            const averageData: LogDatum[] = [];
            const logs = this.getLogsBetween(dateLowerBound, dateUpperBound);

            logs.material_logs.forEach((log, index) => {
                if (index === 0) {return;} // Cannot apply average to first log

                averageData.push({
                    x: toTimestamp(log.log_date),
                    y: logs.getAverageDeltaOfPeriod(dateLowerBound, log.log_date)
                })
            })

            return averageData;
        };

        const generateAverageGainDatum: DatumConstructor = (dateLowerBound, dateUpperBound) => {
            const averageData: LogDatum[] = [];
            const logs = this.getLogsBetween(dateLowerBound, dateUpperBound);


            logs.material_logs.forEach((log, index) => {
                if (index === 0) {return;} // Cannot apply average to first log

                averageData.push({
                    x: toTimestamp(log.log_date),
                    y: logs.getAverageGainOfPeriod(dateLowerBound, log.log_date)
                })
            })

            return averageData;
        };

        return [
            //this.createSeries("Average Delta", generateAverageDeltaDatum, dateFrom, dateTo),
            this.createSeries("Average Gain", generateAverageGainDatum, dateFrom, dateTo)
        ];
    }

    private generateCountGraphData(dateFrom?: Date, dateTo?: Date): Serie[] {
        let getCountDatum: DatumConstructor = (dateLowerBound, dateUpperBound) => {
            const countData: LogDatum[] = [];

            this.material_logs.forEach((log) => {
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

    //TODO: Redo this
    private generateGainsGraphData(dateFrom?: Date, dateTo?: Date): Serie[] {
        const generateDeltaDatum: DatumConstructor = (dateLowerBound, dateUpperBound) => {
            const deltaData: LogDatum[] = [];

            this.material_logs.forEach((log, index) => {
                if (index === 0) {
                    return;
                }

                if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
                    deltaData.push(
                        {
                            x: toTimestamp(log.log_date),
                            y: MaterialHistoryLog.getDelta(this.material_logs[index - 1], log)
                        }
                    )
                }
            })

            return deltaData;
        }
        const generateGainDatum: DatumConstructor = (dateLowerBound, dateUpperBound) => {
            const gainData: LogDatum[] = [];

            this.material_logs.forEach((log, index) => {
                if (index === 0) {
                    return;
                }

                if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
                    let delta = MaterialHistoryLog.getDelta(this.material_logs[index - 1], log);
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

            this.material_logs.forEach((log, index) => {
                if (index === 0) {
                    return;
                }

                if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
                    let delta = MaterialHistoryLog.getDelta(this.material_logs[index - 1], log);
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
