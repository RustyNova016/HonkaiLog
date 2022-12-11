import {z} from "zod";
import {getMaterialWithUserData} from "./getUserMaterialData";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {FadingIn} from "@/components/Animators/FadingIn";
import {PageTitle} from "../../../component/pageComponents/Theme/Theme";
import {Suspense} from "react";
import {CenteredLoadingIcon} from "@/components/UI/Loading/LoadingIcon";
import MaterialLogsManager from "@/app/history/[materialId]/materialLogsManager";
import {HistorySummary} from "@/app/history/[materialId]/historySummary";
import {Material} from "@/utils/Objects/Material";

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const material = await getMaterialWithUserData(Number(parsedParams.materialId));
    const mat = new Material(material.id, material.name)

    return <>
        <FadingIn duration={500} className={"size-inherit overflow-scroll"}>
            <CenterContent>
                <PageTitle title={material.getName(false, true) + " history"}/>

                <Suspense fallback={<CenteredLoadingIcon/>}>
                    <MaterialLogsManager material={material}/>
                </Suspense>

                <HistorySummary materialJson={material.export()} idUser={material.userID}/>
            </CenterContent>
        </FadingIn>
    </>
}