export function removeDaysFromDate(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
}

export function removeDaysFromToday(days: number): Date {
    return removeDaysFromDate(new Date(), days);
}

export function toTimestamp(date: string|Date) {
    if (typeof date === "string") {
         return Date.parse(date);
    } else {
        return date.getTime();
    }
}

export class TimeTools {
    static removeDaysFromDate(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - days);
        return newDate;
    }

    static removeDaysFromToday(days: number): Date {
        return TimeTools.removeDaysFromDate(new Date(), days);
    }

    static toTimestamp(date: string|Date) {
        if (typeof date === "string") {
             return Date.parse(date);
        } else {
            return date.getTime();
        }
    }

    static getDateDifference(date1: Date, date2: Date): number {
        return date1.getTime() - date2.getTime();
    }

    static convertMilisecondsToDays(miliseconds: number): number {
        return miliseconds / (1000 * 60 * 60 * 24);
    }
}