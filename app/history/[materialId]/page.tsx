import {z} from "zod";
import {getMaterialWithUserData} from "./getUserMaterialData";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {FadingIn} from "@/components/Animators/FadingIn";
import {PageTitle} from "../../../component/pageComponents/Theme/Theme";
import {MaterialGeneralSection} from "@/app/history/[materialId]/materialGeneralSection";
import {Suspense} from "react";
import {CenteredLoadingIcon} from "@/components/UI/Loading/LoadingIcon";

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const material = await getMaterialWithUserData(Number(parsedParams.materialId));

    return <>
        <FadingIn duration={500} className={"size-inherit"}>
            <CenterContent>
                <Suspense fallback={<CenteredLoadingIcon/>}>
                    <PageTitle title={material.name + " history"}/>
                </Suspense>

                <Suspense fallback={<CenteredLoadingIcon/>}>
                    <MaterialGeneralSection material={material}/>
                </Suspense>
            </CenterContent>
        </FadingIn>
    </>
}