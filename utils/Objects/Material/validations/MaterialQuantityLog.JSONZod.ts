import {z} from "zod";
import {MaterialZodShape} from "@/utils/Objects/Material/validations/Material.JSONZod";
import {UserZodShape} from "@/lib/Zod/Validations/UserDataZod";
import {zDateString} from "@/utils/Objects/Material/validations/MaterialQuantityLog";

export const MaterialQuantityLogShape = {
    id: z.number().optional(),
    quantity: z.number().min(0),
    loggedAt: z.date().or(zDateString),
    idMaterial: MaterialZodShape.id,
    idUser: UserZodShape.id,
};
export const MaterialQuantityLogJSONZod = z.object(MaterialQuantityLogShape)
export const MaterialQuantityCreateReq = z.object({
    quantity: MaterialQuantityLogShape.quantity,
    loggedAt: MaterialQuantityLogShape.loggedAt.optional(),
    idMaterial: MaterialQuantityLogShape.idMaterial
})