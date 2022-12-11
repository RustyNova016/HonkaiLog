import {z} from "zod";
import {getMaterialWithUserData} from "./getUserMaterialData";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {FadingIn} from "@/components/Animators/FadingIn";
import {PageTitle} from "../../../component/pageComponents/Theme/Theme";
import {lazy, Suspense} from "react";
import {CenteredLoadingIcon} from "@/components/UI/Loading/LoadingIcon";
import MaterialHistory from "@/app/history/[materialId]/materialHistory";
import MaterialGeneralSection from "@/app/history/[materialId]/materialGeneralSection";

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const material = await getMaterialWithUserData(Number(parsedParams.materialId));

    return <>
        <FadingIn duration={500} className={"size-inherit"}>
            <CenterContent>
                <PageTitle title={material.getName(false, true) + " history"}/>

                <Suspense fallback={<CenteredLoadingIcon/>}>
                    <MaterialGeneralSection material={material}/>
                </Suspense>

                <Suspense fallback={<CenteredLoadingIcon/>}>
                    <MaterialHistory material={material}/>
                </Suspense>

            </CenterContent>
        </FadingIn>
    </>
}