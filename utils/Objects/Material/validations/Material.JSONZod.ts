import {z} from "zod";

export const MaterialZodShape = {
    id: z.number().min(0),
    name: z.string(),
    namePlural: z.string().nullable(),
    imageLink: z.string().nullable()
};

export const MaterialJSONZod = z.object(MaterialZodShape)

