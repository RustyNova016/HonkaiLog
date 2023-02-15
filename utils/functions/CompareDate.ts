import {DateComparison} from "@/lib/DayJs/DayTs";

export function compareDates(date: Date, dateBase: Date) {
    if(date < dateBase) {return DateComparison.before}
    if(date > dateBase) {return DateComparison.after}
    return DateComparison.same
}