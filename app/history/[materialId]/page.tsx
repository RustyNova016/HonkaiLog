import {z} from "zod";
import {getMaterialWithUserData} from "./getUserMaterialData";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {FadingIn} from "@/components/Animators/FadingIn";
import {PageTitle} from "../../../component/pageComponents/Theme/Theme";
import {Suspense} from "react";
import {CenteredLoadingIcon} from "@/components/UI/Loading/LoadingIcon";
import MaterialLogsManager from "@/app/history/[materialId]/materialLogsManager";
import {HistorySummary} from "@/app/history/[materialId]/historySummary";
import {GachaSummary} from "@/app/history/[materialId]/gachaSummary";
import {redirect} from "next/navigation";

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const material = await getMaterialWithUserData(Number(parsedParams.materialId));

    if (material.getLogs().isEmpty()) {redirect("/history/" + material.id + "/new")}

    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={material.getName(false, true) + " history"}/>

                <Suspense fallback={<CenteredLoadingIcon/>}>
                    <MaterialLogsManager material={material}/>
                </Suspense>

                <HistorySummary materialJson={material.export()} idUser={material.userID}/>

                <GachaSummary material={material}/>
            </CenterContent>
        </FadingIn>
    </>
}