import {z} from "zod";
import {MaterialZodShape} from "@/lib/Zod/Validations/material";
import {UserZodShape} from "@/lib/Zod/Validations/user";


export const MaterialQuantityLogShape = {
    id: z.number().optional(),
    quantity: z.number().min(0),
    loggedAt: z.date().or(z.string().datetime()),
    idMaterial: MaterialZodShape.id,
    idUser: UserZodShape.id,
};

export const MaterialQuantityLogZod = z.object(MaterialQuantityLogShape)


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

export const MaterialQuantityCreateReq = z.object({
    quantity: MaterialQuantityLogShape.quantity,
    loggedAt: MaterialQuantityLogShape.loggedAt.optional(),
    idMaterial: MaterialQuantityLogShape.idMaterial
})

export const MaterialQuantityLogArrayZod = z.array(MaterialQuantityLogZod);