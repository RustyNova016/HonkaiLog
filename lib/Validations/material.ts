import {z} from "zod";

const MaterialDataZodShape = {
    id: z.number(),
    name: z.string()
};

export const MaterialDataZod = z.object(MaterialDataZodShape)

export const MaterialQuantityLogJSONZod = z.object({
    id: z.number(),
    count: z.number(),
    log_date: z.date()
})

export const MaterialQuantityLogJSONArrayZod = z.array(MaterialQuantityLogJSONZod);

export const UserMaterialDataZod = z.object({
    ...MaterialDataZodShape,
    Material_logs: MaterialQuantityLogJSONArrayZod
})