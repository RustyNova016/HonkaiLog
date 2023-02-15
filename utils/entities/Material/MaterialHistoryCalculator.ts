import dayjs, {Dayjs, OpUnitType, QUnitType} from "dayjs";
import _ from "lodash";
import {LogGenerator, MaterialLogCollection} from "@/utils/entities/Material/MaterialLogCollection";
import {LogOrigin, MaterialQuantityLog} from "@/utils/entities/Material/MaterialQuantityLog";
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

    get filteredLogCollection(): MaterialQuantityLog[] {
        const filteredLogs = [];

        for (const log of this.logCollection.logs) {
            if (this.isLogInFilter(log)) {filteredLogs.push(log)}
        }

        return filteredLogs
    }

    get id(): string {
        return this.materialHistory.id;
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

    get name(): string {
        return this.materialHistory.name;
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
        const newestLog = this.getPreviousLogInFilter(this.logCollection.getNewestLog())
        const oldestLog = this.getNextLogInFilter(this.logCollection.getOldestLog())
        if (newestLog === undefined || oldestLog === undefined) {return 0}

        return newestLog.quantityTotal - oldestLog.quantityTotal;
    }

    /** Return the net gain of the whole collection. */
    public calcNetGain(): number {
        let gain = 0;
        let delta = 0;
        let previousLog = this.logCollection.getOldestLog();
        let currentLog = this.getNextLogInFilter(previousLog);

        if (previousLog === undefined || currentLog === undefined) {return 0}

        while (currentLog !== undefined) {
            delta = (currentLog.quantityBefore - previousLog.quantityTotal) + currentLog.quantityChangeOrZero

            if (delta > 0) {
                gain += delta;
            }

            previousLog = currentLog
            currentLog = this.getNextLogInFilter(currentLog)
        }

        return gain;
    }

    /** Return the net loss of the whole collection */
    public calcNetLoss(): number {
        let loss = 0;
        let delta = 0;
        let previousLog = this.logCollection.getOldestLog();
        let currentLog = this.getNextLogInFilter(previousLog);

        if (previousLog === undefined || currentLog === undefined) {return 0}

        while (currentLog !== undefined) {
            delta = (currentLog.quantityBefore - previousLog.quantityTotal) + currentLog.quantityChangeOrZero

            if (delta < 0) {
                loss += delta;
            }

            previousLog = currentLog
            currentLog = this.getNextLogInFilter(currentLog)
        }

        return loss;
    }

    public calcQuantityAtCurrentTime(datetime: Dayjs) {
        if(this.logCollection.getLogBeforeDate(datetime, true) === undefined) {return }

        const linFunc = this.getLinearFormulaAt(datetime);
        return _.floor((linFunc.a * datetime.unix()) + linFunc.b, 0)
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

    public haveLogsInFilter(): boolean {
        const oldestLog = this.logCollection.getOldestLog();
        return this.isLogInFilter(oldestLog) || this.getNextLogInFilter(oldestLog) !== undefined
    }

    public toJSON(): MaterialHistoryCalculatorJSON {
        return {
            filter: {
                period: {
                    start: this.filter.period.start.toJSON(),
                    end: this.filter.period.end.toJSON()
                }
            },
            materialHistory: this.materialHistory.toJSON()
        }
    }

    toString(plural?: boolean, startcase?: boolean): string {
        return this.materialHistory.toString(plural, startcase);
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

    private getLinearFormulaAt(x: Dayjs): { a: number; b: number } {
        const baseLog = this.logCollection.getLogBeforeDate(x, true);
        const nextLog = this.logCollection.getLogAfterDate(x);

        if (baseLog === undefined) {
            throw new Error(`Cannot find log before the ${x.toString()}. The function cannot be called unless there's a log before and after the given date`)
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

    private getNextLogInFilter(log: MaterialQuantityLog | undefined, allowGenerated: boolean = false): MaterialQuantityLog | undefined {
        if (log === undefined) {return}
        let currentLog = log.nextBlock;

        while (currentLog !== undefined) {
            if (log.id !== currentLog.id && this.isLogInFilter(currentLog) && (allowGenerated || currentLog.origin !== LogOrigin.Generated)) {return currentLog}
            currentLog = currentLog.nextBlock
        }

        return;
    }

    private getPreviousLogInFilter(log: MaterialQuantityLog | undefined, allowGenerated: boolean = false): MaterialQuantityLog | undefined {
        if (log === undefined) {return}
        let currentLog = log.previousBlock;

        while (currentLog !== undefined) {
            if (log.id !== currentLog.id && this.isLogInFilter(currentLog) && (allowGenerated || currentLog.origin !== LogOrigin.Generated)) {return currentLog}
            currentLog = currentLog.previousBlock
        }

        return;
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

    private isLogInFilter(log: MaterialQuantityLog | undefined, includePrevious: boolean = false, includeNext: boolean = false): boolean {
        if (log === undefined) {return false}
        const isLogBeforeStart = log.atTimeAsDayJs.isBefore(this.filter.period.start);
        const isLogAfterEnd = log.atTimeAsDayJs.isAfter(this.filter.period.end);

        if (!isLogBeforeStart && !isLogAfterEnd) {return true}

        if (includePrevious && this.isLogInFilter(log.nextBlock)) {return true}
        if (includeNext && this.isLogInFilter(log.previousBlock)) {return true}

        return false
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