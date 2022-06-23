import {Material} from "./Material";
import {MaterialLog} from "./MaterialLog";
import axios from "axios";
import {IMaterialLogsAPIResponse} from "../../pages/api/material/logs/[id]";
import {APIRoutes} from "../../config/API routes";
import {TimeTools} from "../miscs";

export class MaterialLogCollection {
    logs: MaterialLog[]

    constructor(logs: MaterialLog[]) {

        this.logs = logs;
    }

    static fromAPI(res: IMaterialLogsAPIResponse, material: Material) {
        const logs = []

        for (const materialLog of res.Material_logs) {
            logs.push(new MaterialLog(material, materialLog.count, materialLog.id, new Date(materialLog.log_date), materialLog.userId))
        }

        return new MaterialLogCollection(logs)
    }

    static async getLogsOfMaterial(material: Material): Promise<MaterialLogCollection> {
        const logs = await axios.get<IMaterialLogsAPIResponse>(APIRoutes.materialLogs + material.id);

        return MaterialLogCollection.fromAPI(logs.data, material);
    }

    empty(): boolean {
        return this.logs.length === 0;
    }

    getAverageDelta(): number {
        return (this.getLatestLog().quantity - this.getOldestLog().quantity) / this.getNbDays();
    }

    getAverageDeltaOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).getAverageDelta();
    }

    getAverageGain(): number {
        const nbDays = this.getNbDays();
        return this.getNetGain() / nbDays;
    }

    getAverageGainOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).getAverageGain();
    }

    getCurrentCount(): number {
        if (this.empty()) return 0;
        return this.getLatestLog().quantity;
    }

    /** Returns the gain or loss of the whole collection. */
    getDelta(): number {
        return this.getLatestLog().quantity - this.getOldestLog().quantity;
    }

    /** Returns the gain or loss of a period. */
    getDeltaOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).getDelta();
    }

    getLatestLog() {
        return this.logs[this.logs.length - 1];
    }

    getLogsBetween(dateFrom?: Date, dateTo?: Date): MaterialLogCollection {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return new MaterialLogCollection(
            this.logs.filter(
                (log) => {
                    return new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound;
                }
            )
        )
    }

    getNbDays(): number {
        const time = this.getLatestLog().log_date.getTime() - this.getOldestLog().log_date.getTime();
        return time / (1000 * 60 * 60 * 24);
    }

    /** Return the net gain of the collection. */
    getNetGain(): number {
        let gain = 0;
        let delta = 0;

        this.logs.forEach((log, index) => {
            if (index === 0) {return;}

            delta = this.logs[index - 1].getDelta(log);

            if (delta > 0) {
                gain += delta;
            }
        })

        return gain;
    }

    /** Returns the net gain of the period. */
    getNetGainOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).getNetGain();
    }

    getOldestLog() {
        return this.logs[0];
    }

    getTimeframeMilliseconds(dateFrom: Date | undefined, dateTo: Date | undefined) {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);
        return TimeTools.getDateDifference(dateUpperBound, dateLowerBound);
    }

    /** Returns the timeframe of the history. If no date is given, the timeframe is from the oldest logs to the latest logs.*/
    protected getTimeframe(dateFrom: Date | undefined, dateTo: Date | undefined) {
        const dateLowerBound = dateFrom || this.getOldestLog().log_date;
        const dateUpperBound = dateTo || this.getLatestLog().log_date;
        return {dateLowerBound, dateUpperBound};
    }
}