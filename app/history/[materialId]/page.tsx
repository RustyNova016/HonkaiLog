import {z} from "zod";
import {getUserMaterial} from "./getUserMaterialData";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {FadingIn} from "@/components/Animators/FadingIn";
import {PageTitle, SectionTitle} from "../../../component/pageComponents/Theme/Theme";
import FramedDiv from "../../../component/Layout/FramedDiv";

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const material = await getUserMaterial(parsedParams.materialId)

    return <>
        <FadingIn className={"size-inherit"}>
            <CenterContent>

                <PageTitle title={material.name + " history"}/>

                <FramedDiv sides={true} style={{width: "75%"}}>
                    <SectionTitle title={material.name + " logs"}/>
                </FramedDiv>

            </CenterContent>
        </FadingIn>
    </>
}