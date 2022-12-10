import {z} from "zod";
import {MaterialQuantityLogArrayZod, MaterialQuantityLogZod} from "@/lib/Zod/Validations/MaterialQuantityLog";
import {MaterialZodShape} from "@/lib/Zod/Validations/material";

export const UserMaterialDataZod = z.object({
    ...MaterialZodShape,
    materialQuantityLogs: z.array(
        MaterialQuantityLogZod
    )
})