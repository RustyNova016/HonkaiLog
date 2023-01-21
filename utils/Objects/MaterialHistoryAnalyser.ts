import {Dayjs} from "dayjs";
import _ from "lodash";
import {MaterialLogCollection} from "@/utils/Objects/MaterialLogCollection";
import {MaterialQuantityLog} from "@/utils/Objects/MaterialQuantityLog";

export class MaterialHistoryAnalyser {
    private logs: MaterialLogCollection

    constructor(logs: MaterialLogCollection) {
        if (logs.isEmpty()) {throw new Error("Log Collection cannot be empty")}
        this.logs = logs;
    }

    public createSplitLog(date: Dayjs): MaterialQuantityLog | undefined {
        // Check if there's not already a log there
        const logFoundAtDate = this.logs.findAll({date: date})

        if(logFoundAtDate.length !== 0) {return }

        return new MaterialQuantityLog(
            undefined,
            this.getLinearQuantityAtTimestamp(date),
            this.logs.material,
            date.toDate(),
            this.logs.material.userID
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



    //public calcProjectedQuantity(date: Dayjs): number {
    //    return
    //}

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