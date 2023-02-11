import {z} from "zod";
import {MaterialZodShape} from "@/utils/entities/Material/validations/Material.JSONZod";
import {UserZodShape} from "@/lib/Zod/Validations/UserDataZod";


export const zDateString = z.string().datetime();


export const MaterialQuantityLogCreateJSONShape = {
    id: z.number().optional(),
    quantity: z.number().min(0),
    log_date: z.date(),
    materialId: MaterialZodShape.id,
    userId: UserZodShape.id,
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
};

export const MaterialQuantityLogCreateJSON = z.object(MaterialQuantityLogCreateJSONShape)



