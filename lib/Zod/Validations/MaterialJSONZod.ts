import {z} from "zod";

export const MaterialZodShape = {
    id: z.number().min(0),
    name: z.string()
};

export const MaterialJSONZod = z.object(MaterialZodShape)