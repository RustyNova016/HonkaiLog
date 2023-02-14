import dayjs, {Dayjs} from "dayjs";
import {Period} from "@/utils/types/Period";

export class Timeframe {
    point1: Dayjs;
    point2: Dayjs;

    constructor(point1: dayjs.ConfigType, point2: dayjs.ConfigType) {
        this.point1 = dayjs(point1);
        this.point2 = dayjs(point2);
    }

    toChronologicalPeriod(): Period {
        if(this.point1.isBefore(this.point2)) {
            return {start: this.point1, end: this.point2}
        }
        return {start: this.point2, end: this.point1}
    }

    static fromPeriod(period: Period): Timeframe {
        return new Timeframe(period.start, period.end)
    }
}