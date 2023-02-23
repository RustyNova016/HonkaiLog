import dayjs from "dayjs";

export function parseDate(date: dayjs.ConfigType): Date {
    return dayjs(date).toDate();
}