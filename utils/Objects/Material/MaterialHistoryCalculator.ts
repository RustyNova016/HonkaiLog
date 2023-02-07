import dayjs, {Dayjs, OpUnitType, QUnitType} from "dayjs";
import _ from "lodash";
import {MaterialLogCollection} from "@/utils/Objects/Material/MaterialLogCollection";
import {MaterialQuantityLog} from "@/utils/Objects/Material/MaterialQuantityLog";
import {MaterialQuantity} from "@/utils/Objects/Material/MaterialQuantity";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import logger from "../../../tools/Logger";
import {z} from "zod";
import {MaterialHistoryCalculatorJSONZod} from "@/utils/Objects/Material/validations/MaterialHistoryCalculator.JSONZod";
import {Period} from "@/utils/types/Period";

export interface MaterialHistoryCalculatorFilter {
    period: Period;
}

/** Class that contain all the functions for material logs analysis */
export class MaterialHistoryCalculator {
    private readonly materialHistory: MaterialHistory
    private readonly filter: MaterialHistoryCalculatorFilter

    constructor(materialHistory: MaterialHistory, filter: MaterialHistoryCalculatorFilter) {
        this.materialHistory = materialHistory;
        this.filter = filter;
    }

    get logCollection(): MaterialLogCollection {
        return this.materialHistory.logCollection;
    }

    get material() {
        return this.materialHistory.material
    }

    get logs(): MaterialQuantityLog[] {
        return this.materialHistory.logCollection.logs
    }

    /** Return the net loss of the whole collection */
    public calcNetLoss(): number {
        let totalSpent = 0;
        let delta = 0;
        const logCollection = this.getFilteredLogs(true);

        for (let i = 0; i < logCollection.logs.length; i++) {
            if (i !== 0) {
                const prevLog = logCollection.logs[i - 1];
                const log = logCollection.logs[i];

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

    public getNetDelta(useLinearSpliting = false): number {
        if (useLinearSpliting) {
            return this.addLinearSplit().calcNetDelta();
        }
        return this.calcNetDelta()
    }

    /** Returns the gain or loss of the whole collection. */
    public calcNetDelta(): number {
        const filteredLogs = this.getFilteredLogs();
        return filteredLogs.getNewestLogOrThrow().quantity - filteredLogs.getOldestLogOrThrow().quantity;
    }

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
            new MaterialQuantityLog(undefined, date.toDate(),
                this.materialHistory.userID,
                new MaterialQuantity(material, linearQuantityAtTimestamp)
            )
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

    /** Return the net gain of the whole collection. */
    public calcNetGain(): number {
        let gain = 0;
        let delta = 0;
        const logCollection = this.getFilteredLogs(true);

        for (let i = 0; i < logCollection.logs.length; i++) {
            if (i !== 0) {
                const prevLog = logCollection.logs[i - 1];
                const log = logCollection.logs[i];

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

    /** Create a log at a date given that have the supposed amount at that point in time */
    public createSplitLog(date: Dayjs): MaterialQuantityLog | undefined {
        // Check if there's not already a log there
        const logFoundAtDate = this.logCollection.findAll({date: date})
        logger.info("Log Found:", "HistoryCalculator/createSplitLog", logFoundAtDate);

        if (logFoundAtDate.length !== 0) {
            return
        }

        const material = this.logCollection.material;
        const linearQuantityAtTimestamp = this.getLinearQuantityAtTimestamp(date);
        logger.info("Quantity at time:", "HistoryCalculator/createSplitLog", linearQuantityAtTimestamp);
        if (linearQuantityAtTimestamp === undefined) {
            return undefined;
        }

        return new MaterialQuantityLog(undefined,
            date.toDate(),
            this.materialHistory.userID,
            new MaterialQuantity(material, linearQuantityAtTimestamp)
        )
    }

    public filterToPeriod(): MaterialHistoryCalculator {
        return new MaterialHistoryCalculator(
            this.materialHistory.filterPeriod(this.filter.period),
            this.filter
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

    public static parse(data: z.infer<typeof MaterialHistoryCalculatorJSONZod>): MaterialHistoryCalculator {
        const parsedData = MaterialHistoryCalculatorJSONZod.parse(data);
        return new MaterialHistoryCalculator(
            MaterialHistory.parse(parsedData.materialHistory),
            {
                period: {start: dayjs(parsedData.filter.period.start), end: dayjs(parsedData.filter.period.end)}
            }
        )
    }

    public toJSON(): z.infer<typeof MaterialHistoryCalculatorJSONZod> {
        const period = this.filter.period;
        return {
            materialHistory: this.materialHistory.toJSON(),
            filter: {
                period: {
                    start: period.start.toJSON(),
                    end: period.end.toJSON()
                }
            }
        }
    }

    private getAvgTimeDuration(per: "millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "date" | "milliseconds" | "seconds" | "minutes" | "hours" | "days" | "months" | "years" | "dates" | "d" | "D" | "M" | "y" | "h" | "m" | "s" | "ms" | "quarter" | "quarters" | "Q" | "week" | "weeks" | "w") {
        let start = this.filter.period.start;

        let oldestLogDate = this.logCollection.getOldestLogOrThrow().logDate;
        if (start.isBefore(oldestLogDate)) {
            start = oldestLogDate
        }

        const timeDuration = this.filter.period.end.diff(start, per, true);
        return timeDuration;
    }

    private getFilteredLogs(previousLog = false): MaterialLogCollection {
        return this.materialHistory.logCollection.getLogsInPeriod(this.filter.period, previousLog);
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

        const quantityDifference = nextLog.quantity - baseLog.quantity;
        const timeDifference = nextLog.logDate.unix() - baseLog.logDate.unix();

        const slope = _.divide(quantityDifference, timeDifference);
        const point = baseLog.quantity - (slope * baseLog.logDate.unix())

        return {
            a: slope,
            b: point
        }
    }

    /** Calculate the supposed quantity of the material if we consider it as a linear growth */
    private getLinearQuantityAtTimestamp(date: Dayjs): number | undefined {
        const oldestLog = this.materialHistory.logCollection.getOldestLogOrThrow();
        const dateIsBeforeFirstLog = date.isBefore(oldestLog.logDate);

        // Can't guess what happens before the first logs, so we return undefined
        if (dateIsBeforeFirstLog) {
            return undefined;
        }

        const linFunc = this.getLinearFormulaAt(date);
        return _.floor((linFunc.a * date.unix()) + linFunc.b, 0)
    }
}