import {z} from "zod";
import {UserMaterialJSONZod} from "@/lib/Zod/Validations/UserMaterial";
import {zDateString} from "@/lib/Zod/Validations/MaterialQuantityLog";

export const zPeriodJSON = z.object({
    start: zDateString,
    end: zDateString
});

export const MaterialHistoryCalculatorJSON = z.object({
    materialHistory: UserMaterialJSONZod,
    filter: z.object(
        {
            period: zPeriodJSON
        }
    )
})