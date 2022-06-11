export function addCSSClasses(cssClasses: string[]): string {
    function addCSSProper(css1: string, css2: string) {
        return css1 + " " + css2;
    }

    let outCss = ""
    cssClasses.forEach(css => {
        outCss = addCSSProper(outCss, css);
    })

    return outCss;
}

export function removeDaysFromDate(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
}

export function removeDaysFromToday(days: number): Date {
    return removeDaysFromDate(new Date(), days);
}

export function toTimestamp(date: string | Date) {
    if (typeof date === "string") {
        return Date.parse(date);
    } else {
        return date.getTime();
    }
}

export class TimeTools {
    static convertMilisecondsToDays(miliseconds: number): number {
        return miliseconds / (1000 * 60 * 60 * 24);
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
}