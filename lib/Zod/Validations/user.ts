import {z} from "zod";

export const UserZodShape = {
    id: z.string()
};

export const UserZod = z.object(UserZodShape)