import {LogDatum} from "./LogDatum";

export type DatumConstructor = (dateLowerBound: Date, dateUpperBound: Date) => LogDatum[]