import {z} from "zod";

export const MaterialLogFetchJSONZod = z.object({
    name: z.string()
});