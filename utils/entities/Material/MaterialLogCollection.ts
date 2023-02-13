import {LogOrigin, MaterialQuantityLog, MaterialQuantityLogJSON} from "@/utils/entities/Material/MaterialQuantityLog";
import _ from "lodash";
import {Dayjs} from "dayjs";
import {Period} from "@/utils/types/Period";
import {MaterialQuantityLogModel} from ".prisma/client";
import Logger from "../../../tools/Logger";
import {addLogBeforeChange} from "@/utils/functions/Material/LogGenerators";
import {DateComparison} from "@/lib/DayJs/DayTs";
import {BlockPlacement} from "@/utils/enums/BlockPlacement";

/** List of all the Material_logs of a logs. It can be used to calculate data about the usage of the materials */
export class MaterialLogCollection {
    /** List of the logs contained in the collection */
    private readonly _logs: MaterialQuantityLog[] = []; //TODO: Turn into Map
    public logGenerators = [addLogBeforeChange]

    constructor(inputLogs: MaterialQuantityLog[]) {
        this.push(...inputLogs)
        Logger.info("MaterialLogCollection successfully init")
    }

    /** Return the log sorted from oldest to newest */
    get logs(): MaterialQuantityLog[] {
        const result: MaterialQuantityLog[] = []
        let currentLog = this.getOldestLog();
        if (currentLog === null) {return result}

        while (currentLog !== null) {
            //console.log("Test: ", currentLog)
            result.push(currentLog)
            currentLog = this.getNextLog(currentLog);
        }

        return result
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

    /** Filter the logs according to a test into a new MaterialLogCollection */
    public filter(test: (value: MaterialQuantityLog, index: number, array: MaterialQuantityLog[]) => boolean): MaterialLogCollection {
        return new MaterialLogCollection(this._logs.filter(test))
    }

    public filterPeriod(period: Period, addPrevious: boolean = false, addNext: boolean = false) {
        const logCollection = new MaterialLogCollection(this._logs.filter(thisLog => {
            if (thisLog.atTimeAsDayTs.isBefore(period.start)) {return false}
            if (thisLog.atTimeAsDayTs.isAfter(period.end)) {return false}
            return true
        }));

        if (addPrevious) {
            const oldestLog = logCollection.getOldestLog();
            if (oldestLog === null) {return null;}
            logCollection.pushOne(this.getPreviousLog(oldestLog))
        }

        if (addNext) {
            const newestLog = logCollection.getNewestLog();
            if (newestLog === null) {return null;}
            logCollection.pushOne(this.getNextLog(newestLog))
        }

        return logCollection
    }

    public find(idLog: string): MaterialQuantityLog | null {
        for (const log of this._logs) {
            if (log.id === idLog) {return log}
        }
        return null;
    }

    /** Find all the logs that fit the criteria */
    public findAll(params: { date?: Dayjs }): MaterialQuantityLog[] {
        const outs = []

        for (const log of this._logs) {
            if (params.date !== undefined) {
                if (!log.atTimeAsDayTs.isSame(params.date)) {
                    continue
                }
            }

            outs.push(log)
        }

        return outs
    }

    public getCollectionPeriod() {
        return {
            start: this.getOldestLogOrThrow().atTimeAsDayTs,
            end: this.getNewestLogOrThrow().atTimeAsDayTs
        }
    }

    /** Return the current count of logs that the user last entered.
     * @deprecated*/
    public getCurrentCount(): number {
        this.throwOnEmptyArray()
        return this.getNewestLogOrThrow().quantityTotal;
    }

    public getLogAfterDate(date: Dayjs): MaterialQuantityLog | null {
        const filter = this.filterPeriod({start: this.getOldestLog()?.atTimeAsDayTs || date, end: date}, false, true);
        if (filter === null) {return null}
        return filter.getNewestLog();
    }

    public getLogBeforeDate(date: Dayjs): MaterialQuantityLog | null {
        const filter = this.filterPeriod({start: date, end: this.getNewestLog()?.atTimeAsDayTs || date}, true, false);
        if (filter === null) {return null}
        return filter.getOldestLog();
    }

    /** @deprecated */
    public getLogsInPeriod(period: Period, keepLastLogBeforeDate?: boolean, keepFirstLogBeforeDate?: boolean): MaterialLogCollection {
        const filterPeriod1 = this.filterPeriod(period, keepLastLogBeforeDate, keepFirstLogBeforeDate);
        if (filterPeriod1 === null) {throw new EmptyLogCollectionException()}
        return filterPeriod1
    }

    public getNewestLog() {
        for (const log of this._logs) {
            if (log.idNextLog === null) {return log}
        }

        return null
    }

    /** Return the newest log */
    public getNewestLogOrThrow(): MaterialQuantityLog {
        const log = this.getNewestLog();
        if (log === null) {
            throw new EmptyLogCollectionException()
        }
        return log;
    }

    public getNextLog(log: MaterialQuantityLog) {
        if (log.idNextLog === null) {return null}
        return this.find(log.idNextLog);
    }

    public getOldestLog() {
        for (const log of this._logs) {
            if (this.getPreviousLog(log) === null) {return log}
        }

        return null
    }

    /** Return the oldest log in the list */
    public getOldestLogOrThrow(): MaterialQuantityLog {
        const log = this.getOldestLog();
        if (log === null) {
            throw new EmptyLogCollectionException()
        }
        return log;
    }

    public getPreviousLog(nextLog: MaterialQuantityLog) {
        for (const log of this._logs) {
            if (log.idNextLog === nextLog.id) { return log }
        }

        return null;
    }

    /** Return true if the collection is isEmpty */
    public isEmpty(): boolean {
        return this._logs.length === 0;
    }

    public isLogBetween(log: MaterialQuantityLog, prevLog: MaterialQuantityLog): boolean {
        const comparePrev = log.isPlaced(prevLog);
        if (comparePrev === BlockPlacement.before) {return false}

        const nextLog = this.getNextLog(prevLog);
        if (nextLog === null) {return false}

        const nextLogDate = log.atTimeAsDayTs.compareDates(nextLog.atTime)
        if (nextLogDate === DateComparison.before) {return false}

        if (prevLogDate === DateComparison.same && nextLogDate === DateComparison.same) {

        }

        const quantityChange = nextLog.quantityChange !== null? nextLog.quantityChange : 0
        return (nextLog.quantityTotal - quantityChange) === log.quantityTotal
    }

    public mapChronologically<returnType>(func: (value: MaterialQuantityLog, index: number, array: MaterialLogCollection) => returnType): returnType[] {
        const result: returnType[] = []
        let currentLog = this.getOldestLog();
        if (currentLog === null) {return result}
        let i = 0;

        while (currentLog !== null && currentLog.idNextLog !== null) {
            result.push(func(currentLog, i, this))
            i += 1;
            currentLog = this.getNextLog(currentLog);
        }

        return result
    }

    public checkIfLogIsDuplicate(log: MaterialQuantityLog) {

    }

    /** Add one or multiple logs to the log array */
    public push(...items: MaterialQuantityLog[]) {
        // TODO: Check for duplicates/Optimizations
        // TODO: Check if the logs of the log is the same as this.logs

        // First remove the generated logs that might interfere
        this.removeAllGeneratedLogs()

        // Then insert the logs:
        for (const item of items) {
            if(item.origin !== LogOrigin.Official){

            }

            this._logs.push(item)
            this.associateLog(item)
        }

        // Rebuild the generated logs
        //TODO

        // Rebuild the chain log
        this.associateLogs()

        return this
    }

    public runGenerators(){

    }

    public pushOne(item: MaterialQuantityLog | null) {
        if (item === null) {return this}
        return this.push(item)
    }

    public toJSON(): MaterialLogCollectionJSON {
        return this._logs.map(value => value.toJSON())
    }

    public toModel(): MaterialQuantityLogModel[] {
        const logs = []

        for (const log of this._logs) {
            logs.push(log.toModel())
        }

        return logs
    }

    /** Link log into the chain */
    private associateLog(log: MaterialQuantityLog) {
        if (log.idNextLog !== null) {return;}

        for (const prevLog of this._logs) {
            const compare = log.isPlaced(prevLog);
            if(compare === BlockPlacement.after){
                if(this.getNextLog(prevLog) === null){

                }
            }
            if (this.isLogBetween(log, prevLog)) {
                log.idNextLog = prevLog.idNextLog
                prevLog.idNextLog = log.id
            }
        }
    }

    /** Make sure all the logs are associated */
    private associateLogs() {
        for (const log of this._logs) {
            this.associateLog(log);
        }
    }

    private cleanUp() {

        for (let i = 0; i < this._logs.length; i++) {
            const log = this._logs[i];
            const previousLog = this._logs[i - 1];
            const nextLog = this._logs[i + 1];

            if (log === undefined) {
                continue
            }
            if (previousLog === undefined) {
                continue
            }
            if (nextLog === undefined) {
                continue
            }

            const isSameDateAsPrevious = previousLog.atTimeAsDayTs.isSame(log.atTimeAsDayTs);
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
    }

    /** Remove the log from the chain */
    private dissociateLog(log: MaterialQuantityLog) {
        const prevLog = this.getPreviousLog(log);
        if (prevLog === null) {return}

        const nextLog = this.getNextLog(log);
        if (nextLog === null) {prevLog.idNextLog = null} else {prevLog.idNextLog = nextLog.id}
    }

    private remove(log: string | MaterialQuantityLog) {
        const logToDel = typeof log === "string" ? this.find(log) : log
        if (logToDel === null) {return}

        this.dissociateLog(logToDel)
        _.remove(this._logs, (log) => {
            return log.id === logToDel.id
        });
    }

    private removeAllGeneratedLogs() {
        this._logs.forEach(value => {
            if (value.origin === LogOrigin.Generated) {this.remove(value)}
        })
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