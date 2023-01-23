import {z} from "zod";
import {MaterialQuantityLogZod} from "@/lib/Zod/Validations/MaterialQuantityLog";
import {MaterialZodShape} from "@/lib/Zod/Validations/MaterialJSONZod";

export type UserMaterialData = z.infer<typeof UserMaterialDataZod>;

export const UserMaterialDataZod = z.object({
    ...MaterialZodShape,
    materialQuantityLogs: z.array(
        MaterialQuantityLogZod
    )
})

export const UserMaterialJSONZod = z.object({
    ...MaterialZodShape,
    materialQuantityLogs: z.array(
        MaterialQuantityLogZod
    ),
    userID: z.string()
})