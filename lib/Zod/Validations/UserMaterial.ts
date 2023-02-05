import {z} from "zod";
import {MaterialQuantityLogJSONZod} from "@/lib/Zod/Validations/MaterialQuantityLog";
import {MaterialZodShape} from "@/lib/Zod/Validations/MaterialJSONZod";

export type UserMaterialData = z.infer<typeof UserMaterialDataZod>;

export const UserMaterialDataZod = z.object({
    ...MaterialZodShape,
    materialQuantityLogs: z.array(
        MaterialQuantityLogJSONZod
    ),
    userID: z.string()
})

export const UserMaterialJSONZod = z.object({
    ...MaterialZodShape,
    materialQuantityLogs: z.array(
        MaterialQuantityLogJSONZod
    ),
    userID: z.string()
})