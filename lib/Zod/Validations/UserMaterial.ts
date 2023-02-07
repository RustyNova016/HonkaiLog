import {z} from "zod";
import {MaterialZodShape} from "@/utils/Objects/Material/validations/Material.JSONZod";
import {MaterialQuantityLogJSONZod} from "@/utils/Objects/Material/validations/MaterialQuantityLog.JSONZod";

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