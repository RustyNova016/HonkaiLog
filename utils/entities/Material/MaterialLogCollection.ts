import {LogOrigin, MaterialQuantityLog, MaterialQuantityLogJSON} from "@/utils/entities/Material/MaterialQuantityLog";
import {Dayjs} from "dayjs";
import {Period} from "@/utils/types/Period";
import {MaterialQuantityLogModel} from ".prisma/client";
import {addLogBeforeChangeGenerator} from "@/utils/functions/Material/LogGenerators";
import {Chain, DuplicateBlockError} from "@/utils/classes/Chain";

export type LogGenerator = (collection: MaterialLogCollection) => MaterialQuantityLog | MaterialQuantityLog[] | undefined;

/** List of all the Material_logs of a logs. It can be used to calculate data about the usage of the materials */
export class MaterialLogCollection extends Chain<MaterialQuantityLog> {
    public logGenerators: LogGenerator[] = [addLogBeforeChangeGenerator]

    constructor(inputLogs: MaterialQuantityLog[] | undefined = undefined, logGenerators: LogGenerator[] | undefined = undefined) {
        super();
        if (logGenerators !== undefined) {logGenerators.forEach(value => this.addGenerator(value))}
        if (inputLogs !== undefined) {this.push(...inputLogs)}
    }

    /** Return the logs sorted from oldest to newest */
    get logs(): MaterialQuantityLog[] {
        return this.toArray()
    }

    public static fromJson(data: MaterialLogCollectionJSON, logGenerators: LogGenerator[] | undefined = undefined): MaterialLogCollection {
        return new MaterialLogCollection(data.map(value => MaterialQuantityLog.fromJSON(value)), logGenerators)
    }

    public static fromModel(data: MaterialQuantityLogModel[]): MaterialLogCollection {
        const materialQuantityLogs = [];

        for (const materialQuantityLogJSON of data) {
            materialQuantityLogs.push(MaterialQuantityLog.fromModel(materialQuantityLogJSON));
        }

        return new MaterialLogCollection(materialQuantityLogs);
    }

    public addGenerator(logGenerator: LogGenerator) {
        this.logGenerators.push(logGenerator)
    }

    /** Filter the logs according to a test into a new MaterialLogCollection */
    public filter(test: (value: MaterialQuantityLog, index: number, array: MaterialQuantityLog[]) => boolean): MaterialLogCollection {
        return new MaterialLogCollection(this.logs.filter(test))
    }

    public filterPeriod(period: Period, addPrevious: boolean = false, addNext: boolean = false) {
        const logArray = [];
        for (const thisLog of this.logs) {
            if (thisLog.atTimeAsDayJs.isBefore(period.start)) {continue}
            if (thisLog.atTimeAsDayJs.isAfter(period.end)) {continue}
            logArray.push(thisLog);
        }

        const logCollection = new MaterialLogCollection(logArray);

        if (addPrevious) {
            const oldestLog = logCollection.getOldestLog();
            const previousBlock = oldestLog?.previousBlock;

            if (previousBlock !== undefined) {
                logCollection.push(previousBlock)
            }
        }


        if (addNext) {
            const newestLog = logCollection.getNewestLog();
            const nextBlock = newestLog?.nextBlock;

            if (nextBlock !== undefined) {
                logCollection.push(nextBlock)
            }
        }

        return logCollection
    }

    /** Find all the logs that fit the criteria
     * */
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

    public generateLogs() {
        console.log("Generating Logs")
        const newLogs: MaterialQuantityLog[] = [];

        for (const logGenerator of this.logGenerators) {
            const generatorResult = logGenerator(this);
            if (generatorResult === undefined) {continue}
            if (generatorResult instanceof MaterialQuantityLog) {
                newLogs.push(generatorResult);
                continue
            }
            newLogs.push(...generatorResult)
        }

        this.pushPreserveGenerated(...newLogs)
        console.log("Logs Generated")
    }

    public getCollectionPeriod() {
        return {
            start: this.getOldestLogOrThrow().atTimeAsDayJs,
            end: this.getNewestLogOrThrow().atTimeAsDayJs
        }
    }

    /** Return the current count of logs that the user last entered.
     * @deprecated*/
    public getCurrentCount(): number {
        this.throwOnEmptyArray()
        return this.getNewestLogOrThrow().quantityTotal;
    }

    public getLogAfterDate(date: Dayjs, includeDate: boolean = false): MaterialQuantityLog | undefined {
        let currentLog = this.getOldestLog();

        while (currentLog !== undefined) {
            if (date.isAfter(currentLog.atTime) || (includeDate && date.isSame(currentLog.atTime))) {return currentLog}
            currentLog = currentLog.nextBlock;
        }

        return;
    }

    public getLogBeforeDate(date: Dayjs, includeDate: boolean = false): MaterialQuantityLog | undefined {
        return this.getLogAfterDate(date, !includeDate)?.previousBlock
    }

    public getNewestLog() {
        return this.getLastBlock()
    }

    /** Return the newest log */
    public getNewestLogOrThrow(): MaterialQuantityLog {
        const log = this.getFirstBlock();
        if (log === undefined) {
            throw new EmptyLogCollectionException()
        }
        return log;
    }

    public getOldestLog() {
        return this.getFirstBlock()
    }

    /** Return the oldest log in the list */
    public getOldestLogOrThrow(): MaterialQuantityLog {
        const log = this.getOldestLog();
        if (log === undefined) {
            throw new EmptyLogCollectionException()
        }
        return log;
    }

    public insertFromJSON(data: MaterialLogCollectionJSON): MaterialLogCollection {
        return this.push(...data.map(value => MaterialQuantityLog.fromJSON(value)))
    }

    /** Return true if the collection is isEmpty */
    public isEmpty(): boolean {
        return this.chain.size === 0;
    }

    /** Add one or multiple logs to the log array */
    public push(...items: MaterialQuantityLog[]): MaterialLogCollection {
        // TODO: Check for duplicates/Optimizations
        // TODO: Check if the logs of the log is the same as this.logs
        console.log("Inserting Logs")

        // First remove the generated logs that might interfere
        this.removeAllGeneratedLogs()

        // Then insert the logs:
        for (const item of items) {
            this.insertBlock(item)
        }

        // Rebuild the generated logs
        this.generateLogs();

        console.log("Log Inserted")
        return this
    }

    public pushOne(item: MaterialQuantityLog | null) {
        if (item === null) {return this}
        return this.push(item)
    }

    public resetGeneratedLog() {
        this.removeAllGeneratedLogs();
        this.generateLogs();
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

    protected override insertBlock(newBlock: MaterialQuantityLog | null | undefined) {
        //TODO: Prevent insertion of generated if distance on graph too small

        try {
            super.insertBlock(newBlock);
        } catch (e) {
            if (newBlock === undefined || newBlock === null) {return}
            if (e instanceof DuplicateBlockError) {
                if(newBlock.origin === LogOrigin.Generated) { return; }
                /*const duplicate = this.checkForDuplicate(newBlock);

                // If there is, if it's generated, ignore insert, if not, throw error
                const officialAlreadyInserted = duplicate?.origin === LogOrigin.Official;
                const generatedAlreadyInserted = duplicate?.origin === LogOrigin.Generated
                const newLogIsGenerated = newBlock.origin === LogOrigin.Generated;

                if ((officialAlreadyInserted || generatedAlreadyInserted) && newLogIsGenerated) {return;}*/
                throw e
            }
        }
    }

    // @ts-ignore
    private cleanUp() {

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
    }

    private pushPreserveGenerated(...items: MaterialQuantityLog[]) {
        for (const item of items) {
            this.insertBlock(item)
        }
    }

    private remove(log: string | MaterialQuantityLog) {
        const logToDel = typeof log === "string" ? this.get(log) : log
        if (logToDel === undefined) {return}

        this.removeBlock(logToDel);
    }

    private removeAllGeneratedLogs() {
        this.chain.forEach(value => {
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