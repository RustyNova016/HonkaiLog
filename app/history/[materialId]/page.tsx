import {z} from "zod";
import {getMaterialWithUserData} from "./getUserMaterialData";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {FadingIn} from "@/components/Animators/FadingIn";
import {PageTitle} from "../../../component/pageComponents/Theme/Theme";
import {MaterialGeneralSection} from "@/app/history/[materialId]/materialGeneralSection";

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const material = await getMaterialWithUserData(Number(parsedParams.materialId));

    return <>
        <FadingIn duration={500} className={"size-inherit"}>
            <CenterContent>

                <PageTitle title={material.name + " history"}/>

                <MaterialGeneralSection material={material}/>

            </CenterContent>
        </FadingIn>
    </>
}