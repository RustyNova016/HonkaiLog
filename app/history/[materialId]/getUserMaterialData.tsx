import {getServerUser} from "@/lib/NextAuth/GetSession";
import {MaterialHistory} from "@/utils/entities/Material/MaterialHistory";
import {MaterialORM} from "@/prisma/ORMs/MaterialORM";
import {MaterialQuantityLogORM} from "@/prisma/ORMs/MaterialQuantityLogORM";

/** Get the MaterialHistory object
 *
 * @param idMaterial
 */
export async function getMaterialHistory(idMaterial: string): Promise<MaterialHistory> {
    const idUser = (await getServerUser()).id;
    console.log("Return:", await MaterialQuantityLogORM.getMaterialLog(idUser, idMaterial))
    
    const materialHistory = MaterialHistory.fromModels(
        await MaterialORM.get(idMaterial),
        await MaterialQuantityLogORM.getMaterialLog(idUser, idMaterial),
        idUser
    )

    //console.info("Latest count in object: ", materialHistory.logCollection.getCurrentCount())
    return materialHistory;
}

