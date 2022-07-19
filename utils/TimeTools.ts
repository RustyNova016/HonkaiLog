export class TimeTools {
    static AddDaysToDate(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }
    static convertTo(num: number, from: TimeRef, to: TimeRef): number {
        switch (from) {
            case "milliseconds":
                switch (to) {
                    case "milliseconds":
                        return num;
                    case "days":
                        return num / (1000 * 60 * 60 * 24);
                    default:
                        throw new Error("Not implemented")
                }

            default:
                throw new Error("Not implemented")
        }
    }

    static getDateDifference(date1: Date, date2: Date): number {
        return date1.getTime() - date2.getTime();
    }

    static removeDaysFromDate(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - days);
        return newDate;
    }

    static removeDaysFromToday(days: number): Date {
        return TimeTools.removeDaysFromDate(new Date(), days);
    }

    static toTimestamp(date: string | Date) {
        if (typeof date === "string") {
            return Date.parse(date);
        } else {
            return date.getTime();
        }
    }

    static addDaysToDay(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }
}

export type TimeRef = "milliseconds" | "days";