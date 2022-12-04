import {getServerUser} from "@/lib/NextAuth/GetSession";
import database from "../../../database/database";

export async function getMaterialLogData(idMaterial: string) {
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