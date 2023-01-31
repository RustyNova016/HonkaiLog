import dayjs, {Dayjs, OpUnitType, QUnitType} from "dayjs";
import _ from "lodash";
import {Period} from "@/utils/Objects/Material/MaterialLogCollection";
import {MaterialQuantityLog} from "@/utils/Objects/Material/MaterialQuantityLog";
import {MaterialQuantity} from "@/utils/Objects/Material/MaterialQuantity";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";

/** Class that contain all the functions for material logs analysis */
export class MaterialHistoryCalculator {
    readonly materialHistory: MaterialHistory

    constructor(materialHistory: MaterialHistory) {
        if (materialHistory.logCollection.isEmpty()) {throw new Error("Log Collection cannot be empty")}
        this.materialHistory = materialHistory;
    }

    get logs() {
        return this.materialHistory.logCollection;
    }
    /** Returns the gain or loss of the whole collection. */
    public calcNetDelta(): number {
        return this.logs.getNewestLogOrThrow().quantity - this.logs.getOldestLogOrThrow().quantity;
    }

    /** Return the average delta of the period */
    public calcAvgDelta(period?: Period, per: QUnitType | OpUnitType = "days"): number {
        if (period === undefined) {return this.calcAvgGain(this.logs.getCollectionPeriod(), per)}

        const timeDuration = period.end.diff(period.start, per, true);
        if (timeDuration === 0) return 0

        return _.divide(this.calcNetDelta(), timeDuration);
    }

    calcAvgGain(period?: Period, per: dayjs.QUnitType | dayjs.OpUnitType = "days"): number {
        return this.logs.calcAvgGain(period, per);
    }

    calcNetGain(): number {
        return this.logs.calcNetGain();
    }

    public createSplitLog(date: Dayjs): MaterialQuantityLog | undefined {
        // Check if there's not already a log there
        const logFoundAtDate = this.logs.findAll({date: date})

        if (logFoundAtDate.length !== 0) {return }

        const materialHistory = this.logs.material;
        return new MaterialQuantityLog(undefined,
            date.toDate(),
            materialHistory.userID,
            new MaterialQuantity(materialHistory.material, this.getLinearQuantityAtTimestamp(date))
        )
    }

    private getLinearFormulaAt(x: Dayjs): { a: number; b: number } {
        const baseLog = this.logs.getLogBeforeDate(x);
        const nextLog = this.logs.getLogAfterDate(x);

        if (baseLog === undefined) {throw new Error("Cannot find log before date. The function cannot be called unless there's a log before and after the given date")}
        if (nextLog === undefined) {throw new Error("Cannot find log after date. The function cannot be called unless there's a log before and after the given date")}

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
    private getLinearQuantityAtTimestamp(date: Dayjs): number {
        const dateIsBeforeFirstLog = date.isBefore(this.logs.getOldestLogOrThrow().logDate);
        if (dateIsBeforeFirstLog) {throw new Error("Cannot extrapolate the quantity. The oldest log is newer than the date given")}

        const linFunc = this.getLinearFormulaAt(date);
        console.log("linfunc", linFunc)
        return _.floor((linFunc.a * date.unix()) + linFunc.b, 0)
    }
}