import {z} from "zod";
import {MaterialJSONZod} from "@/lib/Zod/Validations/MaterialJSONZod";

export const MaterialQuantityJSONZod = z.object({
    material: MaterialJSONZod,
    quantity: z.number()
});

