import {z} from "zod";
import {MaterialQuantityJSONZod} from "@/lib/Zod/Validations/MaterialQuantityJSONZod";

export const GachaBannerJSONZod = z.object({
    name: z.string(),
    nbPullsForGuaranty: z.number(),
    nbGuarantiesForBannerCompletion: z.number(),
    pullCost: MaterialQuantityJSONZod
})

export const GachaBannerCalculator = z.object({
    name: z.string(),
    nbPullsForGuaranty: z.number(),
    nbGuarantiesForBannerCompletion: z.number(),
    pullCost: MaterialQuantityJSONZod
})
export type GachaBannerJSON = z.infer<typeof GachaBannerJSONZod>;