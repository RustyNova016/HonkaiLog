import {z} from "zod";

export const MaterialZodShape = {
    id: z.string(),
    name: z.string(),
    namePlural: z.string().nullable(),
    imageLink: z.string().nullable()
};

export const MaterialJSONZod = z.object(MaterialZodShape)

