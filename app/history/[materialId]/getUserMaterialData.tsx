import {getServerUser} from "@/lib/NextAuth/GetSession";
import {MaterialHistory} from "@/utils/entities/Material/MaterialHistory";
import {MaterialORM} from "@/prisma/ORMs/MaterialORM";
import {MaterialQuantityLogORM} from "@/prisma/ORMs/MaterialQuantityLogORM";

/** Get the MaterialHistory object
 *
 * @param idMaterial
 */
export async function getMaterialHistory(idMaterial: string): Promise<MaterialHistory> {
    console.log("object")
    const idUser = (await getServerUser()).id;
    const materialHistory = MaterialHistory.fromModels(
        await MaterialORM.getMaterialModel(idMaterial),
        await MaterialQuantityLogORM.getMaterialQuantityLogsModel(idUser, idMaterial),
        idUser
    )

    //console.info("Latest count in object: ", materialHistory.logCollection.getCurrentCount())
    return materialHistory;
}

