export function removeDaysFromDate(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
}

export function removeDaysFromToday(days: number): Date {
    return removeDaysFromDate(new Date(), days);
}

export function toTimestamp(strDate: string) {
    return Date.parse(strDate);
}