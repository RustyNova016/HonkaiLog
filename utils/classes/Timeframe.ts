import {ITimeframe} from "../../context/TimeframeContext";
import {TimeRef, TimeTools} from "../TimeTools";

export class Timeframe implements ITimeframe{
    end: Date;
    start: Date;

    constructor(start: Date, end: Date) {
        this.end = end;
        this.start = start;
    }

    /** Return the amount of time elapsed between the start and end date in milliseconds */
    public getTimeDifference(timeRef: TimeRef = "milliseconds"): number {
        return TimeTools.convertTo(this.end.getTime() - this.start.getTime(), "milliseconds", timeRef);
    }
}