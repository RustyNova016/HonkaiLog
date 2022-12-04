import {z} from "zod";

export const UserZod = z.object({
    id: z.string()
})