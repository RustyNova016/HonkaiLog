import {getServerUser} from "@/lib/NextAuth/GetSession";
import prisma from "@/lib/prismadb";

export async function getBattlepassLogs() {
    const user = await getServerUser();

    const battlepassLogs = await prisma.battlepassLog.findMany({
        where: {idUser: user.id}
    })

    return battlepassLogs
}