import {z} from "zod";

export const MaterialZodShape = {
    id: z.number().min(0),
    name: z.string(),
    namePlural: z.string().nullable().optional(),
    imageLink: z.string().nullable().optional()
};

export const MaterialJSONZod = z.object(MaterialZodShape)

