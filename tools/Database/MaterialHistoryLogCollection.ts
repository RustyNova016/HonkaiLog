import {MaterialHistoryLog} from "./MaterialHistoryLog";
import {IMaterialLogDBResponse} from "../../database/material_log";
import {TimeTools, toTimestamp} from "../miscs";

export interface IMaterialHistoryLogCollection {
    material_logs: MaterialHistoryLog[];
}

export class MaterialHistoryLogCollection implements IMaterialHistoryLogCollection {
    material_logs: MaterialHistoryLog[];

    constructor(materialLogs: MaterialHistoryLog[]) {
        this.material_logs = materialLogs;
    }

    static DBResponseToLogCollection(materialLogs: IMaterialLogDBResponse[]): MaterialHistoryLog[] {
        const out: MaterialHistoryLog[] = [];
        materialLogs.map((log) => {
            out.push(new MaterialHistoryLog(log));
        })

        out.sort((a, b) => {
            return toTimestamp(a.log_date) - toTimestamp(b.log_date)
        });

        return out;
    }

    getAverageDelta(): number {
        return (this.getLatestLog().count - this.getOldestLog().count) / this.getNbDays();
    }

    getAverageGain(): number {
        return this.getNetGain() / this.getNbDays();
    }

    getAverageGainOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).getAverageGain();
    }

    getAverageDeltaOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).getAverageDelta();
    }

    getCurrentCount(): number {
        return this.getLatestLog().count;
    }

    /** Returns the gain or loss of the whole collection. */
    getDelta(): number {
        return this.getLatestLog().count - this.getOldestLog().count;
    }

    /** Returns the gain or loss of a period. */
    getDeltaOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).getDelta();
    }

    getLatestLog() {
        return this.material_logs[this.material_logs.length - 1];
    }

    getLogsBetween(dateFrom?: Date, dateTo?: Date): MaterialHistoryLogCollection {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return new MaterialHistoryLogCollection(
            this.material_logs.filter(
                (log) => {
                    return new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound;
                }
            )
        )
    }

    getNbDays(): number {
        return (this.getLatestLog().log_date.getTime() - this.getOldestLog().log_date.getTime()) / (1000 * 60 * 60 * 24);
    }

    getTimeframeMilliseconds(dateFrom: Date | undefined, dateTo: Date | undefined) {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);
        return TimeTools.getDateDifference(dateUpperBound, dateLowerBound);
    }

    /** Return the net gain of the collection. */
    getNetGain(): number {
        let gain = 0;
        let delta = 0;

        this.material_logs.forEach((log, index) => {
            if (index === 0) {return;}

            delta = MaterialHistoryLog.getDelta(this.material_logs[index - 1], log);

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
        return this.material_logs[0];
    }

    /** Returns the timeframe of the history. If no date is given, the timeframe is from the oldest log to the latest log.*/
    protected getTimeframe(dateFrom: Date | undefined, dateTo: Date | undefined) {
        const dateLowerBound = dateFrom || this.getOldestLog().log_date;
        const dateUpperBound = dateTo || this.getLatestLog().log_date;
        return {dateLowerBound, dateUpperBound};
    }
}