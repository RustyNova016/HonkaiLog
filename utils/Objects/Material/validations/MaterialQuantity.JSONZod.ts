import {z} from "zod";
import {MaterialJSONZod} from "@/utils/Objects/Material/validations/Material.JSONZod";

export const MaterialQuantityJSONZod = z.object({
    material: MaterialJSONZod,
    quantity: z.number()
});

