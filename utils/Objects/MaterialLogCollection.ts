import {LogSource, MaterialQuantityLog} from "@/utils/Objects/MaterialQuantityLog";
import {MaterialLogsAPIFetchResponse} from "../../pages/api/material/logs/[id]";
import {MaterialQuantity} from "../../tools/Models/MaterialQuantity";
import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import {ITimeframe} from "../../context/TimeframeContext";
import {TimeRef} from "../TimeTools";
import {Timeframe} from "../classes/Timeframe";
import _ from "lodash";
import {z} from "zod";
import {MaterialQuantityLogArrayZod} from "@/lib/Zod/Validations/MaterialQuantityLog";

/** List of all the Material_logs of a material. It can be used to calculate data about the usage of the materials */
export class MaterialLogCollection {
    /** List of the logs contained in the collection */
    readonly logs: MaterialQuantityLog[] = [];

    /** Which material this collection belong to */
    readonly material: MaterialWithUserData;

    constructor(material: MaterialWithUserData, logSource: LogSource) {
        this.material = material;
        this.insertLogs(logSource)
    }

    static parse(data: z.infer<typeof MaterialQuantityLogArrayZod>, material: MaterialWithUserData){
        const materialQuantityLogs = [];

        for (const materialQuantityLogJSON of data) {
            materialQuantityLogs.push(MaterialQuantityLog.parse(materialQuantityLogJSON, material));
        }

        return new MaterialLogCollection(material, materialQuantityLogs);
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
    public calcAvgDelta(per: TimeRef = "days"): number {
        return this.calcNetDelta() / this.getTimeElapsedToToday(per);
    }

    /** Return the average gain of the period */
    public calcAvgGain(per: TimeRef = "days"): number {
        const timeElapsed = this.getTimeElapsed(per);
        if (timeElapsed === 0) return 0

        return _.divide(this.calcNetGain(), timeElapsed);
    }

    /** Return the average gain of the period */
    public calcAvgGainUntilToday(per: TimeRef = "days"): number {
        const timeElapsed = this.getTimeElapsedToToday(per)
        if (timeElapsed === 0) return 0

        return this.calcNetGain() / timeElapsed;
    }

    /** Return the average loss of the period */
    public calcAvgLoss(per: TimeRef = "days"): number {
        return this.calcNetLoss() / this.getTimeElapsedToToday(per);
    }

    /** Returns the gain or loss of the whole collection. */
    public calcNetDelta(): number {
        return this.getLatestLog().quantity - this.getOldestLog().quantity;
    }

    /** Return the net gain of the collection. */
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

    /** Give how much the user spent of the material */
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

    /** Return true if the collection is empty */
    public empty(): boolean {
        return this.logs.length === 0;
    }

    /** Filter the logs according to a test into a new MaterialLogCollection */
    public filter(test: (value: MaterialQuantityLog, index: number, array: MaterialQuantityLog[]) => boolean): MaterialLogCollection {
        return new MaterialLogCollection(this.material, this.logs.filter(test))
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

    /** Return the current count of material that the user last entered. */
    public getCurrentCount(): number {
        this.throwOnEmptyArray()
        return this.getLatestLog().quantity;
    }

    /** Return the newest log */
    public getLatestLog() {
        this.throwOnEmptyArray();
        return this.logs[this.logs.length - 1];
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

    /** Return the logs of a specific timeframe */
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
        const time = this.getLatestLog().log_date.getTime() - this.getOldestLog().log_date.getTime();
        return time / (1000 * 60 * 60 * 24);
    }

    /** Return the oldest log in the list */
    public getOldestLog() {
        return this.logs[0];
    }

    /** Return the amount of time elapsed between the oldest log and the newest log */
    public getTimeElapsed(timeRef: TimeRef = "milliseconds"): number {
        return new Timeframe(this.getOldestLog().log_date, this.getLatestLog().log_date).getTimeDifference(timeRef);
    }

    /** Return the amount of time elapsed between the oldest log and today */
    public getTimeElapsedToToday(timeRef: TimeRef = "milliseconds"): number {
        return new Timeframe(this.getOldestLog().log_date, new Date).getTimeDifference(timeRef);
    }

    /** Returns the timeframe of the history. If no date is given, the timeframe is from the oldest logs to the latest logs.
     * @deprecated
     */
    getTimeframe(dateFrom: Date | undefined, dateTo: Date | undefined) {
        const dateLowerBound = dateFrom || this.getOldestLog().log_date;
        const dateUpperBound = dateTo || this.getLatestLog().log_date;
        return {dateLowerBound, dateUpperBound};
    }

    public insertLogs(logSource: LogSource) {
        const logs = MaterialQuantityLog.toLogs(logSource);

        for (const log of logs) {
            this.addMaterialLog(log);
        }
    }

    /** Create a log and save it to the database */
    public async makeLog(quantity: number) {
        await MaterialQuantityLog.makeLog(new MaterialQuantity(this.material, quantity))
    }

    /** Put the MaterialQuantityLog objects into the array using an API response as input data */
    private addAPIResponseLogs(res: MaterialLogsAPIFetchResponse): void {
        for (const materialLog of res.Material_logs) {
            this.addMaterialLog(MaterialQuantityLog.fromJSON(materialLog, this.material))
        }
    }

    /** Add a log to the log array */
    private addMaterialLog(log: MaterialQuantityLog) {
        // TODO: Check for duplicates/Optimizations
        // TODO: Check if the material is the same
        this.logs.push(log)
    }

    /** Add multiple logs to the array */
    private addMaterialLogs(logs: MaterialQuantityLog[]) {
        for (const log of logs) {
            this.addMaterialLog(log);
        }
    }

    /** Sort this.log from oldest to newest log */
    private sortChronologically() {
        this.logs.sort((a, b) => {
            if (a.isOlderThan(b)) {
                return -1
            } else {
                return 1
            }
        })
    }

    /** Throw an error if logs is empty. Useful to stop calculations without data */
    private throwOnEmptyArray() {
        if (this.empty()) {
            // This bitch empty! YEET!
            throw new Error("No logs are in the array.")
        }
    }
}
