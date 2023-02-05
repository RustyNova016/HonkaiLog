import {z} from "zod";
import {getMaterialHistory} from "./getUserMaterialData";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {FadingIn} from "@/components/Animators/FadingIn";
import {PageTitle} from "../../../component/pageComponents/Theme/Theme";
import {Suspense} from "react";
import {CenteredLoadingIcon} from "@/components/UI/Loading/LoadingIcon";
import MaterialLogsManager from "@/app/history/[materialId]/materialLogsManager";
import {HistorySummary} from "@/app/history/[materialId]/historySummary";
import {redirect} from "next/navigation";

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const materialHistory = await getMaterialHistory(Number(parsedParams.materialId));

    if (!materialHistory.hasLogs()) {redirect("/history/" + materialHistory.id + "/new")}

    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={materialHistory.material.toString(false, true) + " history"}/>

                <Suspense fallback={<CenteredLoadingIcon/>}>
                    <MaterialLogsManager material={materialHistory}/>
                </Suspense>

                <HistorySummary materialJson={materialHistory.toJSON()} idUser={materialHistory.userID}/>
            </CenterContent>
        </FadingIn>
    </>
}