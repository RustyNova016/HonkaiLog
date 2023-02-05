import {MaterialQuantityLog} from "@/utils/Objects/Material/MaterialQuantityLog";
import _ from "lodash";
import {z} from "zod";
import {MaterialQuantityLogArrayZod} from "@/lib/Zod/Validations/MaterialQuantityLog";
import dayjs, {Dayjs, OpUnitType, QUnitType} from "dayjs";
import {Material} from "@/utils/Objects/Material/Material";

export type Period = { start: Dayjs, end: Dayjs };

/** List of all the Material_logs of a logs. It can be used to calculate data about the usage of the materials */
export class MaterialLogCollection {
    /** List of the logs contained in the collection */
    readonly logs: MaterialQuantityLog[] = [];

    /** Which logs this collection belong to */
    readonly material: Material;

    constructor(material: Material, logs: MaterialQuantityLog[]) {
        this.material = material;
        this.logs = MaterialLogCollection.sortLogArray(logs);
    }

    static parse(data: z.infer<typeof MaterialQuantityLogArrayZod>, material: Material) {
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

    /** Return the average delta of the period */
    public calcAvgDelta(period?: Period, per: QUnitType | OpUnitType = "days"): number {
        if (period === undefined) {
            return this.calcAvgGain(this.getCollectionPeriod(), per)
        }

        const timeDuration = period.end.diff(period.start, per, true);
        if (timeDuration === 0) return 0

        return _.divide(this.calcNetDelta(), timeDuration);
    }

    /** Return the average gain of the period */
    public calcAvgGain(period?: Period, per: QUnitType | OpUnitType = "days"): number {
        if (period === undefined) {
            return this.calcAvgGain(this.getCollectionPeriod(), per)
        }

        const timeDuration = period.end.diff(period.start, per, true);
        if (timeDuration === 0) return 0

        return _.divide(this.calcNetGain(), timeDuration);
    }

    /** Return the average loss of the period */
    public calcAvgLoss(period?: Period, per: QUnitType | OpUnitType = "days"): number {
        if (period === undefined) {
            return this.calcAvgGain(this.getCollectionPeriod(), per)
        }

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
                const prevLog = this.logs[i - 1];
                const log = this.logs[i];

                if (prevLog === undefined || log === undefined) {
                    return 0
                }

                delta = prevLog.getChronologicalDifference(log)
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
                const prevLog = this.logs[i - 1];
                const log = this.logs[i];

                if (prevLog === undefined || log === undefined) {
                    return 0
                }
                delta = prevLog.getChronologicalDifference(log)
            }

            if (delta < 0) {
                totalSpent += delta;
            }
        }

        return totalSpent;
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

    /** Find all the logs that fit the criteria */
    public findAll(params: { date?: Dayjs }): MaterialQuantityLog[] {
        const outs = []

        for (const log of this.logs) {
            if (params.date !== undefined) {
                if (!log.logDate.isSame(params.date)) {
                    continue
                }
            }

            outs.push(log)
        }

        return outs
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

    public getLogsInPeriod(period: Period, keepLastLogBeforeDate?: boolean, keepFirstLogBeforeDate?: boolean): MaterialLogCollection {
        return this
            .getLogsNewerThan(period.start, keepLastLogBeforeDate)
            .getLogsOlderThan(period.end, keepFirstLogBeforeDate)
    }

    /** Return all the logs that were made after a date
     *  Optionally add the last log made before the date
     */

    public getLogsNewerThan(date: Dayjs, keepLastLogBeforeDate?: boolean): MaterialLogCollection {
        const filteredLogs = this.filter((value) => {
            return dayjs(value.log_date).isAfter(date) || dayjs(value.log_date).isSame(date)
        });

        if (keepLastLogBeforeDate) {
            const oldLogs = this.getLogsOlderThan(date);

            if (!oldLogs.isEmpty()) {
                const lastLog = oldLogs.getNewestLogOrThrow()
                filteredLogs.push(lastLog);
            }
        }

        return filteredLogs
    }

    /** Return all the logs that were made before a date
     *  Optionally add the first log made after the date
     */
    public getLogsOlderThan(date: Dayjs, keepFirstLogBeforeDate?: boolean) {
        const filteredLogs = this.filter((value) => {
            return value.logDate.isBefore(date) || dayjs(value.log_date).isSame(date)
        });

        if (keepFirstLogBeforeDate) {
            const newLogs = this.getLogsNewerThan(date);

            if (!newLogs.isEmpty()) {
                const lastLog = newLogs.getOldestLogOrThrow()
                filteredLogs.push(lastLog);
            }
        }

        return filteredLogs
    }

    public getNewestLog(): MaterialQuantityLog | undefined {
        return this.logs[this.logs.length - 1];
    }

    /** Return the newest log */
    public getNewestLogOrThrow(): MaterialQuantityLog {
        const log = this.getNewestLog();
        if (log === undefined) {
            throw new EmptyLogCollectionException()
        }
        return log;
    }

    public getOldestLog(): MaterialQuantityLog | undefined {
        return this.logs[0];
    }

    /** Return the oldest log in the list */
    public getOldestLogOrThrow(): MaterialQuantityLog {
        const log = this.getOldestLog();
        if (log === undefined) {
            throw new EmptyLogCollectionException()
        }
        return log;
    }

    /** Return true if the collection is isEmpty */
    public isEmpty(): boolean {
        return this.logs.length === 0;
    }

    /** Give the next log in the array */
    public nextLog(baseLog: MaterialQuantityLog): MaterialQuantityLog | undefined {
        for (const log of this.logs) {
            if (baseLog.logDate.isBefore(log.logDate)) {
                return log
            }
        }
        return undefined
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
        return undefined
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

            if (log === undefined) {
                continue
            }
            if (previousLog === undefined) {
                continue
            }
            if (nextLog === undefined) {
                continue
            }

            const isSameDateAsPrevious = previousLog.logDate.isSame(log.logDate);
            const isSameQuantityAsPrevious = previousLog.quantity === log.quantity;
            const isSameQuantityAsNext = log.quantity === nextLog.quantity;
            const isSameQuantitySandwich = isSameQuantityAsPrevious && isSameQuantityAsNext

            if (isSameDateAsPrevious && isSameQuantityAsPrevious) {
                //console.log("Removing log: ", log, "for being duplicate of:", previousLog)
                this.remove(log);
            }

            if (isSameQuantitySandwich) {
                this.remove(log);
            }

        }

        this.sortChronologically()
    }

    private remove(log: MaterialQuantityLog) {
        _.remove(this.logs, (value) => {
            return log.isSame(value)
        });
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