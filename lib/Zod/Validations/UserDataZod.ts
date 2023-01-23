import {z} from "zod";

export const UserZodShape = {
    id: z.string()
};

export const UserDataZod = z.object(UserZodShape)