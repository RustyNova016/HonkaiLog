import {getServerUser} from "@/lib/NextAuth/GetSession";
import database from "../../../database/database";
import {z} from "zod";

const MaterialDataZodShape = {
    id: z.number(),
    name: z.string()
};
export const MaterialDataZod = z.object(MaterialDataZodShape)

export const MaterialLogDataZog = z.object({
    id: z.number()
})

export const UserMaterialDataZod = z.object({
    ...MaterialDataZodShape,
    Material_logs: z.array(MaterialLogDataZog)
})

export async function getUserMaterialData(idMaterial: string) {
    const user = await getServerUser();
    const materialWithLogs = await database.Material.findOne({
        where: {
            id: idMaterial
        },
        include: {
            model: database.Material_log,
            required: false,
            where: {
                userId: user.id
            }
        }
    });

    return materialWithLogs
}