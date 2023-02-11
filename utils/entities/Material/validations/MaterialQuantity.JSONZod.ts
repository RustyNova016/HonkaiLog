import {z} from "zod";
import {MaterialJSONZod} from "@/utils/entities/Material/validations/Material.JSONZod";

export const MaterialQuantityJSONZod = z.object({
    material: MaterialJSONZod,
    quantity: z.number()
});

