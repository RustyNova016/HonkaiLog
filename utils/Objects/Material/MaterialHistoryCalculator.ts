import dayjs, {Dayjs} from "dayjs";
import _ from "lodash";
import {Period} from "@/utils/Objects/Material/MaterialLogCollection";
import {MaterialQuantityLog} from "@/utils/Objects/Material/MaterialQuantityLog";
import {MaterialQuantity} from "@/utils/Objects/Material/MaterialQuantity";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";

/** Class that contain all the logic for collection wide calculations */
export class MaterialHistoryCalculator {
    readonly materialHistory: MaterialHistory

    constructor(materialHistory: MaterialHistory) {
        if (materialHistory.logCollection.isEmpty()) {throw new Error("Log Collection cannot be empty")}
        this.materialHistory = materialHistory;
    }

    get logs() {
        return this.materialHistory.logCollection;
    }

    calcAvgDelta(period?: Period, per: dayjs.QUnitType | dayjs.OpUnitType = "days"): number {
        return this.logs.calcAvgDelta(period, per);
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
        console.log("Logs: ", this.logs)
        const baseLog = this.logs.getLogBeforeDate(x);
        const nextLog = this.logs.getLogAfterDate(x);

        if (baseLog === undefined) {throw new Error("Cannot find log before date. The function cannot be called unless there's a log before and after the given date")}
        if (nextLog === undefined) {throw new Error("Cannot find log after date. The function cannot be called unless there's a log before and after the given date")}

        console.log("baseLog", baseLog)
        console.log("nextLog", nextLog)

        const quantityDifference = nextLog.quantity - baseLog.quantity;
        const timeDifference = nextLog.logDate.unix() - baseLog.logDate.unix();

        console.log(quantityDifference)

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

        const dateIsAfterLastLog = date.isAfter(this.logs.getNewestLogOrThrow().log_date);

        const linFunc = this.getLinearFormulaAt(date);
        console.log("linfunc", linFunc)
        return _.floor((linFunc.a * date.unix()) + linFunc.b, 0)
    }
}