import {MaterialQuantityLog} from "@/utils/Objects/Material/MaterialQuantityLog";
import {MaterialLogsAPIFetchResponse} from "../../../pages/api/material/logs/[id]";
import {MaterialQuantity} from "./MaterialQuantity";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {ITimeframe} from "../../../context/TimeframeContext";
import {TimeRef} from "../../TimeTools";
import {Timeframe} from "../../classes/Timeframe";
import _ from "lodash";
import {z} from "zod";
import {MaterialQuantityLogArrayZod} from "@/lib/Zod/Validations/MaterialQuantityLog";
import dayjs, {Dayjs, OpUnitType, QUnitType} from "dayjs";
import {MaterialHistoryCalculator} from "@/utils/Objects/Material/MaterialHistoryCalculator";
import {LogSource} from "@/utils/Types/LogSource";

export type Period = { start: Dayjs, end: Dayjs };

/** List of all the Material_logs of a logs. It can be used to calculate data about the usage of the materials */
export class MaterialLogCollection {
    /** List of the logs contained in the collection */
    readonly logs: MaterialQuantityLog[] = [];

    /** Which logs this collection belong to */
    readonly material: MaterialHistory;

    constructor(material: MaterialHistory, logs: MaterialQuantityLog[]) {
        this.material = material;
        this.logs = MaterialLogCollection.sortLogArray(logs);
    }

    static parse(data: z.infer<typeof MaterialQuantityLogArrayZod>, material: MaterialHistory) {
        const materialQuantityLogs = [];

        for (const materialQuantityLogJSON of data) {
            materialQuantityLogs.push(MaterialQuantityLog.parse(materialQuantityLogJSON, material));
        }

        return new MaterialLogCollection(material, materialQuantityLogs);
    }

    public static sortLogArray(logs: MaterialQuantityLog[]) {
        return logs.sort((a, b) => {
            if (a.madeBefore(b)) {
                return -1
            } else {
                return 1
            }
        })
    }

    /** Add logs from any source
     *  @return boolean Return true if logs got added
     *  @deprecated
     */
    public addLogs(logs?: MaterialQuantityLog[], APIResponseData?: MaterialLogsAPIFetchResponse): boolean {
        let logAdded = false

        if (logs !== undefined) {
            this.addMaterialLogs(logs)
            logAdded = true
        }

        if (APIResponseData !== undefined) {
            this.addAPIResponseLogs(APIResponseData)
            logAdded = true
        }

        this.sortChronologically()

        return logAdded
    }

    /** Return the average delta of the period */
    public calcAvgDelta(period?: Period, per: QUnitType | OpUnitType = "days"): number {
        if (period === undefined) {return this.calcAvgGain(this.getCollectionPeriod(), per)}

        const timeDuration = period.end.diff(period.start, per, true);
        if (timeDuration === 0) return 0

        return _.divide(this.calcNetDelta(), timeDuration);
    }

    /** Return the average gain of the period */
    public calcAvgGain(period?: Period, per: QUnitType | OpUnitType = "days"): number {
        if (period === undefined) {return this.calcAvgGain(this.getCollectionPeriod(), per)}

        const timeDuration = period.end.diff(period.start, per, true);
        if (timeDuration === 0) return 0

        return _.divide(this.calcNetGain(), timeDuration);
    }

    /** Return the average gain of the period
     * @deprecated*/
    public calcAvgGainUntilToday(per: TimeRef = "days"): number {
        const timeElapsed = this.getTimeElapsedToToday(per)
        if (timeElapsed === 0) return 0

        return this.calcNetGain() / timeElapsed;
    }

    /** Return the average loss of the period */
    public calcAvgLoss(period?: Period, per: QUnitType | OpUnitType = "days"): number {
        if (period === undefined) {return this.calcAvgGain(this.getCollectionPeriod(), per)}

        const timeDuration = period.end.diff(period.start, per, true);
        if (timeDuration === 0) return 0

        return _.divide(this.calcNetLoss(), timeDuration);
    }

    /** Returns the gain or loss of the whole collection. */
    public calcNetDelta(): number {
        return this.getNewestLogOrThrow().quantity - this.getOldestLogOrThrow().quantity;
    }

    /** Return the net gain of the whole collection. */
    public calcNetGain(): number {
        let gain = 0;
        let delta = 0;

        for (let i = 0; i < this.logs.length; i++) {
            if (i !== 0) {
                delta = this.logs[i - 1].getChronologicalDifference(this.logs[i])
            }

            if (delta > 0) {
                gain += delta;
            }
        }

        return gain;
    }

    /** Return the net loss of the whole collection */
    public calcNetLoss(): number {
        let totalSpent = 0;
        let delta = 0;

        for (let i = 0; i < this.logs.length; i++) {
            if (i !== 0) {
                delta = this.logs[i - 1].getChronologicalDifference(this.logs[i])
            }

            if (delta < 0) {
                totalSpent += delta;
            }
        }

        return totalSpent;
    }

    public findAll(params: {date?: Dayjs}): MaterialQuantityLog[] {
        const outs = []

        for (const log of this.logs) {
            if(params.date !== undefined){
                if (!log.logDate.isSame(params.date)){
                    continue
                }
            }

            outs.push(log)
        }

        return outs
}

    /** Export the logs to a plain object */
    public export(): z.infer<typeof MaterialQuantityLogArrayZod> {
        const logs = []

        for (const log of this.logs) {
            logs.push(log.export())
        }

        return logs
    }

    /** Filter the logs according to a test into a new MaterialLogCollection */
    public filter(test: (value: MaterialQuantityLog, index: number, array: MaterialQuantityLog[]) => boolean): MaterialLogCollection {
        return new MaterialLogCollection(this.material, this.logs.filter(test))
    }

    public getAnalyser() {
        return new MaterialHistoryCalculator(this)
    }

    /** @deprecated */
    getAverageGain(): number {
        const nbDays = this.getNbDays();
        return this.calcNetGain() / nbDays;
    }

    /** @deprecated */
    getAverageGainOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).getAverageGain();
    }

    public getCollectionPeriod() {
        return {
            start: this.getOldestLogOrThrow().logDate,
            end: this.getNewestLogOrThrow().logDate
        }
    }

    public getCollectionPeriodDuration(per: QUnitType | OpUnitType = "days"): number {
        const period = this.getCollectionPeriod();
        return period.end.diff(period.start, per, true);
    }

    /** Return the current count of logs that the user last entered. */
    public getCurrentCount(): number {
        this.throwOnEmptyArray()
        return this.getNewestLogOrThrow().quantity;
    }

    public getLogAfterDate(date: Dayjs): MaterialQuantityLog | undefined {
        return this.getLogsNewerThan(date).getOldestLog();
    }

    public getLogBeforeDate(date: Dayjs): MaterialQuantityLog | undefined {
        return this.getLogsOlderThan(date).getNewestLog();
    }



    /** @deprecated */
    getLogsBetween(dateFrom?: Date, dateTo?: Date): MaterialLogCollection {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return new MaterialLogCollection(
            this.material,
            this.logs.filter(
                (log) => {
                    return new Date(log.log_date) >= dateLowerBound && new Date(log.log_date) <= dateUpperBound;
                }
            )
        )
    }

    /** Return the logs of a specific timeframe
     * @deprecated*/
    public getLogsInTimeframe(timeframe: ITimeframe, addPreviousLog?: boolean): MaterialLogCollection {
        const filteredLogs = this.filter((log) => log.inTimeframe(timeframe));

        if (addPreviousLog) {
            for (let i = 0; i < this.logs.length; i++) {
                if (this.logs[i].log_date > timeframe.start) {
                    if (i !== 0) {
                        filteredLogs.addLogs([this.logs[i - 1]])
                    }
                }
            }
        }

        return filteredLogs
    }

    /** Return the number of days between each ends of the period
     *  @deprecated
     */
    public getNbDays(): number {
        const time = this.getNewestLogOrThrow().log_date.getTime() - this.getOldestLogOrThrow().log_date.getTime();
        return time / (1000 * 60 * 60 * 24);
    }

    public getNewestLog(): MaterialQuantityLog | undefined {
        return this.logs[this.logs.length - 1];
    }

    /** Return the newest log */
    public getNewestLogOrThrow(): MaterialQuantityLog {
        this.throwOnEmptyArray()
        return this.logs[this.logs.length - 1];
    }

    public getOldestLog(): MaterialQuantityLog | undefined {
        return this.logs[0];
    }

    /** Return the oldest log in the list */
    public getOldestLogOrThrow(): MaterialQuantityLog {
        this.throwOnEmptyArray();
        return this.logs[0];
    }

    /** Return the amount of time elapsed between the oldest log and the newest log */
    public getTimeElapsed(timeRef: TimeRef = "milliseconds"): number {
        return new Timeframe(this.getOldestLogOrThrow().log_date, this.getNewestLogOrThrow().log_date).getTimeDifference(timeRef);
    }

    /** Return the amount of time elapsed between the oldest log and today */
    public getTimeElapsedToToday(timeRef: TimeRef = "milliseconds"): number {
        return new Timeframe(this.getOldestLogOrThrow().log_date, new Date).getTimeDifference(timeRef);
    }

    /** Returns the timeframe of the history. If no date is given, the timeframe is from the oldest logs to the latest logs.
     * @deprecated
     */
    getTimeframe(dateFrom: Date | undefined, dateTo: Date | undefined) {
        const dateLowerBound = dateFrom || this.getOldestLogOrThrow().log_date;
        const dateUpperBound = dateTo || this.getNewestLogOrThrow().log_date;
        return {dateLowerBound, dateUpperBound};
    }

    /** @deprecated */
    public insertLogs(logSource: LogSource) {
        const logs = MaterialQuantityLog.toLogs(logSource);

        for (const log of logs) {
            this.addMaterialLog(log);
        }
    }

    /** Return true if the collection is isEmpty */
    public isEmpty(): boolean {
        return this.logs.length === 0;
    }

    /** Create a log and save it to the database */
    public async makeLog(quantity: number) {
        await MaterialQuantityLog.makeLog(new MaterialQuantity(this.material, quantity))
    }

    /** Give the next log in the array */
    public nextLog(baseLog: MaterialQuantityLog): MaterialQuantityLog | undefined {
        for (const log of this.logs) {
            if (baseLog.logDate.isBefore(log.logDate)) {
                return log
            }
        }
    }

    /** Give the previous log in the array */
    public previousLog(baseLog: MaterialQuantityLog): MaterialQuantityLog | undefined {
        let previousLog: MaterialQuantityLog | undefined

        for (const log of this.logs) {
            if (baseLog.logDate.isAfter(log.logDate)) {
                return previousLog
            }

            previousLog = log;
        }
    }

    /** Add one or multiple logs to the log array */
    public push(...items: MaterialQuantityLog[]) {
        // TODO: Check for duplicates/Optimizations
        // TODO: Check if the logs of the log is the same as this.logs
        this.logs.push(...items)
        this.sortChronologically()
        this.cleanUp()
        return this
    }

    /** Return all the logs that were made before a date
     *  Optionally add the first log made after the date
     */
    public getLogsOlderThan(date: Dayjs, keepFirstLogBeforeDate?: boolean) {
        const filteredLogs = this.filter((value) => {return value.logDate.isBefore(date) || dayjs(value.log_date).isSame(date)});

        if (keepFirstLogBeforeDate) {
            const newLogs = this.getLogsNewerThan(date);

            if (!newLogs.isEmpty()) {
                const lastLog = newLogs.getOldestLogOrThrow()
                filteredLogs.push(lastLog);
            }
        }

        return filteredLogs
    }

    public getLogsInPeriod(period: Period, keepLastLogBeforeDate?: boolean, keepFirstLogBeforeDate?: boolean): MaterialLogCollection {
        return this
            .getLogsNewerThan(period.start, keepLastLogBeforeDate)
            .getLogsOlderThan(period.end, keepFirstLogBeforeDate)
    }

    /** Return all the logs that were made after a date
     *  Optionally add the last log made before the date
     */
    public getLogsNewerThan(date: Dayjs, keepLastLogBeforeDate?: boolean): MaterialLogCollection {
        const filteredLogs = this.filter((value) => {return dayjs(value.log_date).isAfter(date) || dayjs(value.log_date).isSame(date)});

        if (keepLastLogBeforeDate) {
            const oldLogs = this.getLogsOlderThan(date);

            if (!oldLogs.isEmpty()) {
                const lastLog = oldLogs.getNewestLogOrThrow()
                filteredLogs.push(lastLog);
            }
        }

        return filteredLogs
    }

    /** Sort this.log from oldest to newest log */
    public sortChronologically() {
        this.logs.sort((a, b) => {
            if (a.madeBefore(b)) {
                return -1
            } else {
                return 1
            }
        })
        return this
    }

    /** Put the MaterialQuantityLog objects into the array using an API response as input data
     * @deprecated
     * */
    private addAPIResponseLogs(res: MaterialLogsAPIFetchResponse): void {
        for (const materialLog of res.Material_logs) {
            this.addMaterialLog(MaterialQuantityLog.fromJSON(materialLog, this.material))
        }
    }

    /** Add a log to the log array */
    private addMaterialLog(log: MaterialQuantityLog) {
        // TODO: Check for duplicates/Optimizations
        // TODO: Check if the logs is the same
        this.logs.push(log)
    }

    /** Add multiple logs to the array */
    private addMaterialLogs(logs: MaterialQuantityLog[]) {
        for (const log of logs) {
            this.addMaterialLog(log);
        }
    }

    private cleanUp() {
        this.sortChronologically()

        for (let i = 0; i < this.logs.length; i++) {
            const log = this.logs[i];
            const previousLog = this.logs[i - 1];
            const nextLog = this.logs[i + 1];

            if (previousLog === undefined) {continue}
            if (nextLog === undefined) {continue}

            const isSameDateAsPrevious = previousLog.logDate.isSame(log.logDate);
            const isSameQuantityAsPrevious = previousLog.quantity === log.quantity;
            const isSameQuantityAsNext = log.quantity === nextLog.quantity;
            const isSameQuantitySandwich = isSameQuantityAsPrevious && isSameQuantityAsNext

            if (isSameDateAsPrevious && isSameQuantityAsPrevious) {
                console.log("Removing log: ", log, "for being duplicate of:", previousLog)
                this.remove(log);
            }
        }

        this.sortChronologically()
    }

    private remove(log: MaterialQuantityLog) {
        _.remove(this.logs, (value, index) => {return log.isSame(value)});
        this.cleanUp();
    }

    /** Throw an error if logs is isEmpty. Useful to stop calculations without data */
    private throwOnEmptyArray() {
        if (this.isEmpty()) {
            // This bitch isEmpty! YEET!
            throw new EmptyLogCollectionException
        }
    }
}

export class EmptyLogCollectionException extends Error {
    constructor() {
        super("No logs are in the collection.");
    }
}