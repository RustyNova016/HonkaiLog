import {HistorySummary} from "@/app/history/[materialId]/historySummary";
import MaterialLogsManager from "@/app/history/[materialId]/materialLogsManager";
import {FadingIn} from "@/components/Animators/FadingIn";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {CenteredLoadingIcon} from "@/components/UI/Loading/LoadingIcon";
import {PageTitle} from "@/components/UI/Theme/PageTitle";
import {getIdUserServer} from "@/lib/NextAuth/GetSession";
import {Material} from "@/utils/entities/Material/Material";
import {MaterialBuilder} from "@/utils/entities/Material/MaterialBuilder";
import {MaterialGetter} from "@/utils/entities/Material/MaterialGetter";
import {redirect} from "next/navigation";
import {Suspense} from "react";
import {z} from "zod";

export default async function Page({params}: any) {
    const idMaterial = z.object({materialId: z.string()}).parse(params).materialId;
    const materialInfo = await MaterialGetter.getServerSideMaterialInfo(idMaterial, await getIdUserServer());

    if (materialInfo.history.logs.length === 0) {
        redirect(`/history/${idMaterial}/new`);
    }

    const material: Material = MaterialBuilder.convertToEntities(materialInfo).material;
    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={material.toString(false, true) + " history"}/>

                <Suspense fallback={<CenteredLoadingIcon/>}>
                    <MaterialLogsManager historyCalculator={material.history.getCalculator()}/>
                </Suspense>

                <HistorySummary materialInfo={materialInfo}/>
            </CenterContent>
        </FadingIn>
    </>;
}