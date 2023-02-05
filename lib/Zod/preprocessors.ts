import {z} from "zod";

export const castToString = z.preprocess((val) => String(val), z.string());
export const castToNumber = z.preprocess((val) => Number(val), z.string());