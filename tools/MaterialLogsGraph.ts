import {GraphType} from "../features/Material/components/HistorySummary/MaterialLogsAnalytics";
import {Serie} from "@nivo/line";
import {toTimestamp} from "./Miscs";
import {DatumConstructor} from "./Types/DatumConstructor";
import {LogDatum} from "./Types/LogDatum";
import {MaterialWithLogs} from "./Models/MaterialWithLogs";


export class MaterialLogsGraph {
    material: MaterialWithLogs;

    constructor(material: MaterialWithLogs) {
        this.material = material;
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
        const {dateLowerBound, dateUpperBound} = this.material.logs.getTimeframe(dateFrom, dateTo);

        return {
            id: name,
            data: data(dateLowerBound, dateUpperBound).sort((a, b) => a.x - b.x)
        }
    }

    private generateAveragesGraphData(dateFrom?: Date, dateTo?: Date): Serie[] {
        const generateAverageDeltaDatum: DatumConstructor = (dateLowerBound, dateUpperBound) => {
            const averageData: LogDatum[] = [];
            const logs = this.material.logs.getLogsBetween(dateLowerBound, dateUpperBound);

            logs.logs.forEach((log, index) => {
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
            const logs = this.material.logs.getLogsBetween(dateLowerBound, dateUpperBound);


            logs.logs.forEach((log, index) => {
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

            this.material.logs.logs.forEach((log) => {
                if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
                    countData.push(
                        {
                            x: toTimestamp(log.log_date),
                            y: log.quantity
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

            this.material.logs.logs.forEach((log, index) => {
                if (index === 0) {
                    return;
                }

                if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
                    deltaData.push(
                        {
                            x: toTimestamp(log.log_date),
                            y: this.material.logs.logs[index - 1].getQuantityDifference(log)
                        }
                    )
                }
            })

            return deltaData;
        }
        const generateGainDatum: DatumConstructor = (dateLowerBound, dateUpperBound) => {
            const gainData: LogDatum[] = [];

            this.material.logs.logs.forEach((log, index) => {
                if (index === 0) {
                    return;
                }

                if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
                    let delta = this.material.logs.logs[index - 1].getQuantityDifference(log)
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

            this.material.logs.logs.forEach((log, index) => {
                if (index === 0) {
                    return;
                }

                if (new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound) {
                    let delta = this.material.logs.logs[index - 1].getQuantityDifference(log)
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