import dayjs, {Dayjs} from "dayjs";

export class DayTs {
    public date: Dayjs

    constructor(date: dayjs.ConfigType) {
        this.date = dayjs(date)
    }

    public async compareDateAsync(date: dayjs.ConfigType) {
        return new Promise(async resolve => {
            const isBef = this.isBeforeAsync(date).then(value => value ? resolve(DateComparison.before) : false);
            const isSame = this.isSameAsync(date).then(value => value ? resolve(DateComparison.same) : false);
            const isAft = this.isAfterAsync(date).then(value => value ? resolve(DateComparison.after) : false);

            if (!(await isBef) && !(await isSame) && !(await isAft)) {
                throw new Error("Impossible")
            }
        })
    }

    public compareDates(date: dayjs.ConfigType): DateComparison {
        if (this.isBefore(date)) {return DateComparison.before}
        if (this.isAfter(date)) {return DateComparison.after}
        if (this.isSame(date)) {return DateComparison.same}

        throw new Error("Impossible state");
    }

    public isAfter(date: dayjs.ConfigType) { return this.date.isAfter(date)}

    public async isAfterAsync(date: dayjs.ConfigType) {
        return new Promise<boolean>(resolve => resolve(this.isAfter(date)))
    }

    public isBefore(date: dayjs.ConfigType) { return this.date.isBefore(date)}

    public async isBeforeAsync(date: dayjs.ConfigType) {
        return new Promise<boolean>(resolve => resolve(this.isBefore(date)))
    }

    public isSame(date: dayjs.ConfigType) { return this.date.isSame(date)}

    public async isSameAsync(date: dayjs.ConfigType) {
        return new Promise<boolean>(resolve => resolve(this.isSame(date)))
    }
}

export function compareDayjs(dateBase: Dayjs, date: dayjs.ConfigType): DateComparison {
    if (dateBase.isBefore(date)) {return DateComparison.before}
    if (dateBase.isAfter(date)) {return DateComparison.after}
    if (dateBase.isSame(date)) {return DateComparison.same}

    throw new Error("Impossible state");
}


export function dayTs(date: dayjs.ConfigType) {
    return new DayTs(date)
}


export enum DateComparison {
    before,
    same,
    after
}

