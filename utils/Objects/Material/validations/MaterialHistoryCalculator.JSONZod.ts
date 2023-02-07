import {z} from "zod";
import {UserMaterialJSONZod} from "@/lib/Zod/Validations/UserMaterial";
import {zDateString} from "@/utils/Objects/Material/validations/MaterialQuantityLog";

export const zPeriodJSON = z.object({
    start: zDateString,
    end: zDateString
});

export const MaterialHistoryCalculatorJSONZod = z.object({
    materialHistory: UserMaterialJSONZod,
    filter: z.object(
        {
            period: zPeriodJSON
        }
    )
})