import {z} from "zod";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {FadingIn} from "@/components/Animators/FadingIn";
import {Suspense} from "react";
import {CenteredLoadingIcon} from "@/components/UI/Loading/LoadingIcon";
import MaterialLogsManager from "@/app/history/[materialId]/materialLogsManager";
import {HistorySummary} from "@/app/history/[materialId]/historySummary";
import {redirect} from "next/navigation";
import {PageTitle} from "@/components/UI/Theme/PageTitle";
import {MaterialORM} from "@/prisma/ORMs/MaterialORM";
import {getServerUser} from "@/lib/NextAuth/GetSession";

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const materialHistory = await MaterialORM.getMaterialHistory(parsedParams.materialId, (await getServerUser()).id)

    if (!materialHistory.hasLogs()) {redirect("/history/" + materialHistory.id + "/new")}

    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={materialHistory.material.toString(false, true) + " history"}/>

                <Suspense fallback={<CenteredLoadingIcon/>}>
                    <MaterialLogsManager material={materialHistory}/>
                </Suspense>

                <HistorySummary materialJson={materialHistory.toJSON()}/>
            </CenterContent>
        </FadingIn>
    </>
}