import dayjs, {Dayjs, OpUnitType, QUnitType} from "dayjs";
import _ from "lodash";
import {LogGenerator, MaterialLogCollection} from "@/utils/entities/Material/MaterialLogCollection";
import {MaterialQuantityLog} from "@/utils/entities/Material/MaterialQuantityLog";
import {MaterialHistory, MaterialHistoryJSON} from "@/utils/entities/Material/MaterialHistory";
import {Period} from "@/utils/types/Period";
import {Material} from "@/utils/entities/Material/Material";

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

    public static fromJSON(data: MaterialHistoryCalculatorJSON): MaterialHistoryCalculator {
        const materialHistoryCalculator = new MaterialHistoryCalculator(
            new MaterialHistory(
                Material.fromJSON(data.materialHistory.material),
                new MaterialLogCollection(),
                data.materialHistory.idUser
            ),
            {
                period: {start: dayjs(data.filter.period.start), end: dayjs(data.filter.period.end)}
            }
        );

        materialHistoryCalculator.logCollection.insertFromJSON(data.materialHistory.logs)

        return materialHistoryCalculator
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
        let previousLog = this.getFilteredLogCollection(true)?.getOldestLog();
        let currentLog = previousLog?.nextBlock;

        if (previousLog === undefined || currentLog === undefined) {return NaN}

        while (currentLog !== undefined) {
            delta = (currentLog.quantityTotal + currentLog.quantityChangeOrZero) - previousLog.quantityTotal

            if (delta > 0) {
                gain += delta;
            }

            previousLog = currentLog
            currentLog = currentLog.nextBlock
        }

        return gain;
    }

    /** Return the net loss of the whole collection */
    public calcNetLoss(): number {
        let gain = 0;
        let delta = 0;
        let previousLog = this.getFilteredLogCollection(true)?.getOldestLog();
        let currentLog = previousLog?.nextBlock;

        if (previousLog === undefined || currentLog === undefined) {return NaN}

        while (currentLog !== undefined) {
            delta = (currentLog.quantityTotal + currentLog.quantityChangeOrZero) - previousLog.quantityTotal

            if (delta < 0) {
                gain += delta;
            }

            previousLog = currentLog
            currentLog = currentLog.nextBlock
        }

        return gain;
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
        return this.materialHistory.logCollection.getNewestLog()?.quantityTotal || NaN
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
        this.logCollection.addGenerator(this.getStartLogGenerator())
        this.logCollection.addGenerator(this.getEndLogGenerator())
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

    private getEndLogGenerator() {
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

        return AddLogAtEndOfFilter
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

    private getStartLogGenerator() {
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
        return AddLogAtStartOfFilter
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