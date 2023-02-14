import dayjs, {Dayjs, OpUnitType, QUnitType} from "dayjs";
import _ from "lodash";
import {MaterialLogCollection} from "@/utils/entities/Material/MaterialLogCollection";
import {MaterialQuantityLog} from "@/utils/entities/Material/MaterialQuantityLog";
import {MaterialHistory, MaterialHistoryJSON} from "@/utils/entities/Material/MaterialHistory";
import logger from "../../../tools/Logger";
import {z} from "zod";
import {
    MaterialHistoryCalculatorJSONZod
} from "@/utils/entities/Material/validations/MaterialHistoryCalculator.JSONZod";
import {Period} from "@/utils/types/Period";

export interface MaterialHistoryCalculatorFilter {
    period: Period;
}

/** Class that contain all the functions for material logs analysis */
export class MaterialHistoryCalculator {
    readonly filter: MaterialHistoryCalculatorFilter
    readonly materialHistory: MaterialHistory

    constructor(materialHistory: MaterialHistory, filter?: MaterialHistoryCalculatorFilter | undefined) {
        this.materialHistory = materialHistory;
        const oldestLog = materialHistory.logCollection.getOldestLog();
        console.log(oldestLog)
        const newestLog = materialHistory.logCollection.getNewestLog();
        this.filter = filter || {
            period: {
                start: oldestLog?.atTimeAsDayJs || dayjs(),
                end: newestLog?.atTimeAsDayJs || dayjs()
            }
        };
    }

    get logCollection(): MaterialLogCollection {
        return this.materialHistory.logCollection;
    }

    get logs(): MaterialQuantityLog[] {
        return this.materialHistory.logCollection.logs
    }

    get material() {
        return this.materialHistory.material
    }

    public static async parse(data: z.infer<typeof MaterialHistoryCalculatorJSONZod>): Promise<MaterialHistoryCalculator> {
        const parsedData = MaterialHistoryCalculatorJSONZod.parse(data);
        return new MaterialHistoryCalculator(
            await MaterialHistory.fromJSON(parsedData.materialHistory),
            {
                period: {start: dayjs(parsedData.filter.period.start), end: dayjs(parsedData.filter.period.end)}
            }
        )
    }

    /** Return a copy of the calculator with split logs at the filter's dates */
    public addLinearSplit(): MaterialHistoryCalculator {
        // We get a copy of the current history
        const historyCopy = this.materialHistory.copy();

        const splitLog = this.createSplitLog(this.filter.period.start);
        logger.info("SplitLog received Value:", "HistoryCalculator/getHistoryWithSplitLog", splitLog);

        if (splitLog !== undefined) {
            historyCopy.logCollection.push(splitLog);
        }

        return new MaterialHistoryCalculator(historyCopy, this.filter);
    }

    /** @deprecated */
    public addLogAtStartOfFilterPeriod() {
        // Check if there's not already a log there
        const date = this.filter.period.start;
        const logFoundAtDate = this.logCollection.findAll({date: date})

        if (logFoundAtDate.length !== 0) {
            return
        }

        const material = this.materialHistory.material;
        const linearQuantityAtTimestamp = this.getLinearQuantityAtTimestamp(date);
        if (linearQuantityAtTimestamp === undefined) {
            return
        }

        this.materialHistory.logCollection.push(
            new MaterialQuantityLog(undefined, linearQuantityAtTimestamp, date.toDate(), material.id, this.materialHistory.userID)
        )
    }

    /** Return the average delta of the period */
    public calcAvgDelta(per: QUnitType | OpUnitType = "days"): number {
        const timeDuration = this.getAvgTimeDuration(per);
        if (timeDuration === 0) return 0

        return _.divide(this.getNetDelta(true), timeDuration);
    }

    public calcAvgGain(per: dayjs.QUnitType | dayjs.OpUnitType = "days"): number {
        const timeDuration = this.getAvgTimeDuration(per);
        if (timeDuration === 0) return 0

        return _.divide(this.getNetGain(true), timeDuration);
    }

    public calcAvgLoss(per: dayjs.QUnitType | dayjs.OpUnitType = "days"): number {
        const timeDuration = this.getAvgTimeDuration(per);
        if (timeDuration === 0) return 0

        return _.divide(this.getNetloss(true), timeDuration);
    }

    /** Returns the gain or loss of the whole collection. */
    public calcNetDelta(): number {
        const filteredLogs = this.getFilteredLogCollection();
        if(filteredLogs === undefined) {return NaN}

        const newestLog = filteredLogs.getNewestLog();
        const oldestLog = filteredLogs.getOldestLog();
        if (newestLog === undefined || oldestLog === undefined) {return NaN}
        console.log("Log Test:", newestLog, oldestLog)
        console.log("log list:", filteredLogs.toJSON())

        return newestLog.quantityTotal - oldestLog.quantityTotal;
    }

    /** Return the net gain of the whole collection. */
    public calcNetGain(): number {
        let gain = 0;
        let delta = 0;
        const logCollection = this.getFilteredLogCollection(true);
        if (logCollection === undefined){return NaN}

        const materialQuantityLogs = logCollection.logs;
        for (let i = 0; i < materialQuantityLogs.length; i++) {
            if (i !== 0) {
                const prevLog = materialQuantityLogs[i - 1];
                const log = materialQuantityLogs[i];

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
        const logCollection = this.getFilteredLogCollection(true);
        if (logCollection === undefined){return NaN}

        const materialQuantityLogs = logCollection.logs;
        for (let i = 0; i < materialQuantityLogs.length; i++) {
            if (i !== 0) {
                const prevLog = materialQuantityLogs[i - 1];
                const log = materialQuantityLogs[i];

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

    /** Create a log at a date given that have the supposed amount at that point in time
     * @deprecated  */
    public createSplitLog(date: Dayjs): MaterialQuantityLog | undefined {
        // Check if there's not already a log there
        const logFoundAtDate = this.logCollection.findAll({date: date})
        logger.info("Log Found:", "HistoryCalculator/createSplitLog", logFoundAtDate);

        if (logFoundAtDate.length !== 0) {
            return
        }

        const material = this.material;
        const linearQuantityAtTimestamp = this.getLinearQuantityAtTimestamp(date);
        logger.info("Quantity at time:", "HistoryCalculator/createSplitLog", linearQuantityAtTimestamp);
        if (linearQuantityAtTimestamp === undefined) {
            return undefined;
        }

        return new MaterialQuantityLog(undefined, linearQuantityAtTimestamp, date.toDate(), material.id, this.materialHistory.userID)
    }

    public filterToPeriod(): MaterialHistoryCalculator {
        return new MaterialHistoryCalculator(
            this.materialHistory.filterPeriod(this.filter.period),
            this.filter
        )
    }

    public getCurrentCount() {
        return this.materialHistory.logCollection.getNewestLog()?.quantityTotal || null
    }

    public getNetDelta(useLinearSpliting = false): number {
        if (useLinearSpliting) {
            return this.addLinearSplit().calcNetDelta();
        }
        return this.calcNetDelta()
    }

    public getNetGain(useLinearSpliting = false): number {
        if (useLinearSpliting) {
            return this.addLinearSplit().calcNetGain();
        }
        return this.calcNetGain()
    }

    public getNetloss(useLinearSpliting = false): number {
        if (useLinearSpliting) {
            return this.addLinearSplit().calcNetLoss();
        }
        return this.calcNetLoss()
    }

    public toJSON() {
        return Object.assign({}, this);
    }

    private getAvgTimeDuration(per: "millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "date" | "milliseconds" | "seconds" | "minutes" | "hours" | "days" | "months" | "years" | "dates" | "d" | "D" | "M" | "y" | "h" | "m" | "s" | "ms" | "quarter" | "quarters" | "Q" | "week" | "weeks" | "w") {
        let start = this.filter.period.start;

        let oldestLogDate = this.logCollection.getOldestLogOrThrow().atTimeAsDayJs;
        if (start.isBefore(oldestLogDate)) {
            start = oldestLogDate
        }

        const timeDuration = this.filter.period.end.diff(start, per, true);
        return timeDuration;
    }

    private getFilteredLogCollection(previousLog = false, nextLog = false): MaterialLogCollection | undefined {
        return this.materialHistory.logCollection.filterPeriod(this.filter.period, previousLog, nextLog);
    }

    private getLinearFormulaAt(x: Dayjs): { a: number; b: number } {
        const baseLog = this.logCollection.getLogBeforeDate(x);
        const nextLog = this.logCollection.getLogAfterDate(x);

        if (baseLog === undefined) {
            throw new Error("Cannot find log before date. The function cannot be called unless there's a log before and after the given date")
        }
        if (nextLog === undefined) {
            throw new Error("Cannot find log after date. The function cannot be called unless there's a log before and after the given date")
        }

        const quantityDifference = nextLog.quantityTotal - baseLog.quantityTotal;
        const timeDifference = nextLog.atTimeAsDayJs.unix() - baseLog.atTimeAsDayJs.unix();

        const slope = _.divide(quantityDifference, timeDifference);
        const point = baseLog.quantityTotal - (slope * baseLog.atTimeAsDayJs.unix())

        return {
            a: slope,
            b: point
        }
    }

    /** Calculate the supposed quantity of the material if we consider it as a linear growth */
    private getLinearQuantityAtTimestamp(date: Dayjs): number | undefined {
        const oldestLog = this.materialHistory.logCollection.getOldestLogOrThrow();
        const dateIsBeforeFirstLog = date.isBefore(oldestLog.atTimeAsDayJs);

        // Can't guess what happens before the first logs, so we return undefined
        if (dateIsBeforeFirstLog) {
            return undefined;
        }

        const linFunc = this.getLinearFormulaAt(date);
        return _.floor((linFunc.a * date.unix()) + linFunc.b, 0)
    }
}

export type MaterialHistoryCalculatorJSON = {
    materialHistory: MaterialHistoryJSON,
    filter: {
        period: {
            start: string,
            end: string
        }
    }
}