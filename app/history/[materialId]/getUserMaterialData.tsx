import {getServerUser} from "@/lib/NextAuth/GetSession";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {UserMaterialDataZod} from "@/lib/Zod/Validations/UserMaterial";
import prisma from "@/lib/prismadb";

/** Request the database for a logs with user info
 *
 * @param idMaterial
 */
export async function getUserMaterialData(idMaterial: number) {
    const user = await getServerUser();

    const materialWithLogs = await prisma.material.findUniqueOrThrow({
        where: {
            id: idMaterial
        },
        include: {
            materialQuantityLogs: {
                where: {
                    idUser: user.id
                }
            }
        }
    })

    // Parse it with zod to be typesafe
    return UserMaterialDataZod.parse(materialWithLogs);
}

/** Get the MaterialHistory object
 *
 * @param idMaterial
 */
export async function getMaterialHistory(idMaterial: number): Promise<MaterialHistory> {
    const materialWithUserData = MaterialHistory.parse(await getUserMaterialData(idMaterial), (await getServerUser()).id);
    //console.info("Latest count in object: ", materialWithUserData.logCollection.getCurrentCount())
    return materialWithUserData;
}

