import {getServerUser} from "@/lib/NextAuth/GetSession";
import database from "../../../database/database";
import {UserMaterialDataZod} from "@/lib/Validations/material";
import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";

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

    return UserMaterialDataZod.parse(materialWithLogs);
}

export async function getUserMaterial(idMaterial: string){
    return MaterialWithUserData.parse(await getUserMaterialData(idMaterial), (await getServerUser()).id);
}