import {
    MaterialQuantityLog,
    MaterialQuantityLogJSON,
    MaterialQuantityLogModelIndex
} from "@/utils/entities/Material/MaterialQuantityLog";
import _ from "lodash";
import dayjs, {Dayjs, OpUnitType, QUnitType} from "dayjs";
import {Period} from "@/utils/types/Period";
import {MaterialQuantityLogModel} from ".prisma/client";
import logger from "../../../tools/Logger";

/** List of all the Material_logs of a logs. It can be used to calculate data about the usage of the materials */
export class MaterialLogCollection {
    /** List of the logs contained in the collection */
    readonly logs: MaterialQuantityLog[] = [];

    constructor(logs: MaterialQuantityLog[]) {
        this.logs = MaterialLogCollection.sortLogArray(logs);
    }



    private static sortLogs(): MaterialLogCollection {
        const sortedLogs = [];

        for (const log of this.logs) {

        }
    }

    private removeAllGeneratedLogs() {
        _.remove(this.logs, (log) => {
            return log.isGenerated
        });
    }

    private removeById(id: string){
        _.remove(this.logs, (log) => {
            return log.id === id
        });
    }

    public static fromJson(data: MaterialLogCollectionJSON): MaterialLogCollection {
        return new MaterialLogCollection(data.map(value => MaterialQuantityLog.fromJSON(value)))
    }

    public static fromModel(data: MaterialQuantityLogModel[]): MaterialLogCollection {
        const materialQuantityLogs = [];

        for (const materialQuantityLogJSON of data) {
            materialQuantityLogs.push(MaterialQuantityLog.fromModel(materialQuantityLogJSON));
        }

        return new MaterialLogCollection(materialQuantityLogs);
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

    /** Filter the logs according to a test into a new MaterialLogCollection */
    public filter(test: (value: MaterialQuantityLog, index: number, array: MaterialQuantityLog[]) => boolean): MaterialLogCollection {
        return new MaterialLogCollection(this.logs.filter(test))
    }

    /** Find all the logs that fit the criteria */
    public findAll(params: { date?: Dayjs }): MaterialQuantityLog[] {
        const outs = []

        for (const log of this.logs) {
            if (params.date !== undefined) {
                if (!log.atTimeAsDayJs.isSame(params.date)) {
                    continue
                }
            }

            outs.push(log)
        }

        return outs
    }

    public getCollectionPeriod() {
        return {
            start: this.getOldestLogOrThrow().atTimeAsDayJs,
            end: this.getNewestLogOrThrow().atTimeAsDayJs
        }
    }

    public getCollectionPeriodDuration(per: QUnitType | OpUnitType = "days"): number {
        const period = this.getCollectionPeriod();
        return period.end.diff(period.start, per, true);
    }

    /** Return the current count of logs that the user last entered. */
    public getCurrentCount(): number {
        this.throwOnEmptyArray()
        return this.getNewestLogOrThrow().quantityTotal;
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
            return dayjs(value.atTimeAsDayJs).isAfter(date) || dayjs(value.atTimeAsDayJs).isSame(date)
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
            return value.atTimeAsDayJs.isBefore(date) || dayjs(value.atTimeAsDayJs).isSame(date)
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
            if (baseLog.atTimeAsDayJs.isBefore(log.atTimeAsDayJs)) {
                return log
            }
        }
        return undefined
    }

    /** Give the previous log in the array */
    public previousLog(baseLog: MaterialQuantityLog): MaterialQuantityLog | undefined {
        let previousLog: MaterialQuantityLog | undefined

        for (const log of this.logs) {
            if (baseLog.atTimeAsDayJs.isAfter(log.atTimeAsDayJs)) {
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

        // First remove the generated logs that might interfere
        this.removeAllGeneratedLogs()

        // Then insert the logs:
        this.logs.push(...items)

        // Rebuild the generated logs


        this.sortChronologically()
        //this.cleanUp()
        return this
    }

    public createGeneratedLogs() {
        for (const log of this.logs) {
            if (log.quantityChange !== null){

            }
        }
    }

    public searchByIndex(index: MaterialQuantityLogModelIndex): MaterialQuantityLog | null {
        for (const log of this.logs) {
            const isSameIndex = log.hasSameIndex(index)
            if (isSameIndex) {
                return log
            }
        }

        return null
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

    public toJSON(): MaterialLogCollectionJSON {
        return this.logs.map(value => value.toJSON())
    }

    public toModel(): MaterialQuantityLogModel[] {
        const logs = []

        for (const log of this.logs) {
            logs.push(log.toModel())
        }

        return logs
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

            const isSameDateAsPrevious = previousLog.atTimeAsDayJs.isSame(log.atTimeAsDayJs);
            const isSameQuantityAsPrevious = previousLog.quantityTotal === log.quantityTotal;
            const isSameQuantityAsNext = log.quantityTotal === nextLog.quantityTotal;
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

    private pushOne(log: MaterialQuantityLog) {
        logger.info("Adding log:", "[MaterialLogCollection/pushOne]", log)

        const logBefore = log.createLogBefore();
        logger.info("Created Log Maybe", "[MaterialLogCollection/pushOne]", logBefore)
        if (logBefore !== undefined) {
            logger.info("Created Log Before", "[MaterialLogCollection/pushOne]")
            this.pushOne(logBefore)
        }

        // See if the date is already used
        const foundLog = this.searchByIndex(log)
        if (foundLog) {
            logger.info("Found Log:", "[MaterialLogCollection/pushOne]", foundLog);
            logger.info("Discarding addition of log:", "[MaterialLogCollection/pushOne]", log)
            return
        }

        logger.info("Log Accepted", "[MaterialLogCollection/pushOne]")
        this.logs.push(log)
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

export type MaterialLogCollectionJSON = MaterialQuantityLogJSON[]

export class EmptyLogCollectionException extends Error {
    constructor() {
        super("No logs are in the collection.");
    }
}