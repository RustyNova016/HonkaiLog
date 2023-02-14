import dayjs, {Dayjs, OpUnitType, QUnitType} from "dayjs";
import _ from "lodash";
import {LogGenerator, MaterialLogCollection} from "@/utils/entities/Material/MaterialLogCollection";
import {MaterialQuantityLog} from "@/utils/entities/Material/MaterialQuantityLog";
import {MaterialHistory, MaterialHistoryJSON} from "@/utils/entities/Material/MaterialHistory";
import {z} from "zod";
import {MaterialHistoryCalculatorJSONZod} from "@/utils/entities/Material/validations/MaterialHistoryCalculator.JSONZod";
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
        this.filter = filter || {
            period: {
                start: materialHistory.logCollection.getOldestLog()?.atTimeAsDayJs || dayjs(),
                end: materialHistory.logCollection.getNewestLog()?.atTimeAsDayJs || dayjs()
            }
        };
        this.addGenerators();
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

    /** Return the average delta of the period */
    public calcAvgDelta(per: QUnitType | OpUnitType = "days"): number {
        const timeDuration = this.getAvgTimeDuration(per);
        if (timeDuration === 0) return 0

        return _.divide(this.getNetDelta(), timeDuration);
    }

    public calcAvgGain(per: dayjs.QUnitType | dayjs.OpUnitType = "days"): number {
        const timeDuration = this.getAvgTimeDuration(per);
        if (timeDuration === 0) return 0

        return _.divide(this.getNetGain(), timeDuration);
    }

    public calcAvgLoss(per: dayjs.QUnitType | dayjs.OpUnitType = "days"): number {
        const timeDuration = this.getAvgTimeDuration(per);
        if (timeDuration === 0) return 0

        return _.divide(this.getNetloss(), timeDuration);
    }

    /** Returns the gain or loss of the whole collection. */
    public calcNetDelta(): number {
        const filteredLogs = this.getFilteredLogCollection();
        if (filteredLogs === undefined) {return NaN}

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
        if (logCollection === undefined) {return NaN}

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
        if (logCollection === undefined) {return NaN}

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

    public calcQuantityAtCurrentTime(datetime: Dayjs) {
        const oldestLog = this.materialHistory.logCollection.getOldestLog();
        const dateIsBeforeFirstLog = datetime.isBefore(oldestLog?.atTimeAsDayJs);

        // Can't guess what happens before the first logs, so we return undefined
        if (oldestLog === undefined || dateIsBeforeFirstLog) {return;}

        const linFunc = this.getLinearFormulaAt(datetime);
        return _.floor((linFunc.a * datetime.unix()) + linFunc.b, 0)
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

    public getNetDelta(): number {
        return this.calcNetDelta()
    }

    public getNetGain(): number {
        return this.calcNetGain()
    }

    public getNetloss(): number {
        return this.calcNetLoss()
    }

    public toJSON() {
        return Object.assign({}, this);
    }

    private addGenerators() {
        const AddLogAtStartOfFilter: LogGenerator = () => {
            const quantityTotal = this.calcQuantityAtCurrentTime(this.filter.period.start);
            if (quantityTotal === undefined) {return;}

            return new MaterialQuantityLog(
                undefined,
                quantityTotal,
                this.filter.period.start.toDate(),
                this.material.id,
                this.materialHistory.userID,
            )
        }

        const AddLogAtEndOfFilter: LogGenerator = () => {
            const quantityTotal = this.calcQuantityAtCurrentTime(this.filter.period.end);
            if (quantityTotal === undefined) {return;}

            return new MaterialQuantityLog(
                undefined,
                quantityTotal,
                this.filter.period.end.toDate(),
                this.material.id,
                this.materialHistory.userID,
            )
        }

        this.logCollection.addGenerator(AddLogAtStartOfFilter);
        this.logCollection.addGenerator(AddLogAtEndOfFilter);
        this.logCollection.resetGeneratedLog();
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
            return {a: 0, b: baseLog.quantityTotal}
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