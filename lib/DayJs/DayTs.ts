import {Dayjs} from "dayjs";

export class DayTs extends Dayjs{
    public compareDates(date: string | number | Dayjs | Date | null | undefined): DateComparison {
        if(this.isBefore(date)) {return DateComparison.before}
        if(this.isSame(date)) {return DateComparison.same}
        if(this.isAfter(date)) {return DateComparison.after}

        throw new Error("Impossible state");
    }
}

export function dayTs(date: string | number | Dayjs | Date | null | undefined){
    return new DayTs(date)
}

export enum DateComparison {
    before,
    same,
    after
}