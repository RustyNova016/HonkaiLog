import {getServerUser} from "@/lib/NextAuth/GetSession";
import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
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

/** Get the MaterialWithUserData object
 *
 * @param idMaterial
 */
export async function getMaterialWithUserData(idMaterial: number): Promise<MaterialWithUserData> {
    const materialWithUserData = MaterialWithUserData.parse(await getUserMaterialData(idMaterial), (await getServerUser()).id);
    //console.info("Latest count in object: ", materialWithUserData.logCollection.getCurrentCount())
    return materialWithUserData;
}