import {Material} from "./Material";
import {MaterialLog} from "./MaterialLog";
import axios from "axios";
import {MaterialLogsAPIFetchResponse} from "../../pages/api/material/logs/[id]";
import {APIRoutes} from "../../data/API routes";
import {TimeTools} from "../Miscs";
import {MaterialQuantity} from "./MaterialQuantity";
import {MaterialWithLogs} from "./MaterialWithLogs";
import {Timeframe} from "../../context/TimeframeContext";

/** List of all the MaterialLogs of an material. It can be used to calculate data about the usage of the materials */
export class MaterialLogCollection {
    readonly logs: MaterialLog[] = [];
    readonly material: MaterialWithLogs;

    constructor(material: MaterialWithLogs, logs?: MaterialLog[]) {
        this.material = material;
        this.addLogs(logs);
    }

    /** Create a MaterialLogCollection object with a wider input range */
    public static getMaterialLogCollection(material: MaterialWithLogs, logs?: MaterialLog[], APIResponseData?: MaterialLogsAPIFetchResponse) {
        let logsArray: MaterialLog[] = []

        if (logs === undefined && APIResponseData === undefined) {
            throw new Error("Cannot create collection: Both data sources are undefined");
        }

        if (logs !== undefined) {
            logsArray = [...logsArray, ...logs]
        }

        if (APIResponseData?.Material_logs !== undefined) {
            for (const materialLog of APIResponseData?.Material_logs) {
                logsArray.push(MaterialLog.fromJSON(materialLog, material))
            }
        }

        return new MaterialLogCollection(material, logsArray);
    }

    /** Put the MaterialLog objects into the array using an API response as input data */
    public addAPIResponseLogs(res: MaterialLogsAPIFetchResponse): void {
        for (const materialLog of res.Material_logs) {
            this.addMaterialLog(MaterialLog.fromJSON(materialLog, this.material))
        }
    }

    /** Add logs from any source
     *  @return boolean Return true if logs got added
     */
    public addLogs(logs?: MaterialLog[], APIResponseData?: MaterialLogsAPIFetchResponse): boolean {
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

    /** Add a log to the log array */
    public addMaterialLog(log: MaterialLog) {
        // TODO: Check for duplicates/Optimizations
        this.logs.push(log)
    }

    /** Add multiple logs to the array */
    public addMaterialLogs(logs: MaterialLog[]) {
        for (const log of logs) {
            this.addMaterialLog(log);
        }
    }

    /** Return the net gain of the collection. */
    public calcGainAmount(): number {
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
    public calcSpentAmount(): number {
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

    /** Initialize the logs with a material object */
    public async fetchLogsOfMaterial(material: Material): Promise<void> {
        const logs = await axios.get<MaterialLogsAPIFetchResponse>(APIRoutes.materialLogs + material.id);

        this.addAPIResponseLogs(logs.data);
    }

    /** Filter the logs according to a test into a new MaterialLogCollection */
    public filter(test: (value: MaterialLog, index: number, array: MaterialLog[]) => boolean): MaterialLogCollection {
        return new MaterialLogCollection(this.material, this.logs.filter(test))
    }

    getAverageDelta(): number {
        return (this.getLatestLog().quantity - this.getOldestLog().quantity) / this.getNbDays();
    }

    /** @deprecated */
    getAverageDeltaOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).getAverageDelta();
    }

    getAverageGain(): number {
        const nbDays = this.getNbDays();
        return this.calcGainAmount() / nbDays;
    }

    /** @deprecated */
    getAverageGainOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).getAverageGain();
    }

    /** Return the current count of material that the user has in game... Well, the count they last logged. */
    getCurrentCount(): number {
        if (this.empty()) return 0;
        return this.getLatestLog().quantity;
    }

    /** Returns the gain or loss of the whole collection. */
    calcDifference(): number {
        return this.getLatestLog().quantity - this.getOldestLog().quantity;
    }

    /** Returns the gain or loss of a period.
     * @deprecated
     */
    getDeltaOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).calcDifference();
    }

    getLatestLog() {
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
    getLogsInTimeframe(timeframe: Timeframe): MaterialLogCollection {
        return this.filter((log) => log.inTimeframe(timeframe))
    }

    getNbDays(): number {
        const time = this.getLatestLog().log_date.getTime() - this.getOldestLog().log_date.getTime();
        return time / (1000 * 60 * 60 * 24);
    }

    /** Returns the net gain of the period. */
    getNetGainOfPeriod(dateFrom?: Date, dateTo?: Date): number {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);

        return this.getLogsBetween(dateLowerBound, dateUpperBound).calcGainAmount();
    }

    /** Return the oldest log in the list */
    getOldestLog() {
        return this.logs[0];
    }

    /** Returns the timeframe of the history. If no date is given, the timeframe is from the oldest logs to the latest logs.
     * @deprecated
     */
    getTimeframe(dateFrom: Date | undefined, dateTo: Date | undefined) {
        const dateLowerBound = dateFrom || this.getOldestLog().log_date;
        const dateUpperBound = dateTo || this.getLatestLog().log_date;
        return {dateLowerBound, dateUpperBound};
    }

    getTimeframeMilliseconds(dateFrom: Date | undefined, dateTo: Date | undefined) {
        const {dateLowerBound, dateUpperBound} = this.getTimeframe(dateFrom, dateTo);
        return TimeTools.getDateDifference(dateUpperBound, dateLowerBound);
    }

    /** Create a log and save it to the database */
    public async makeLog(matQuantity: MaterialQuantity, quantity: number) {
        await MaterialLog.makeLog(new MaterialQuantity(this.material, quantity))
    }

    /** Throw an error if logs is empty. Useful to stop calculations without data */
    throwOnEmptyArray() {
        if (this.empty()) {
            // This bitch empty! YEET!
            throw new Error("No logs are in the array.")
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
}
