import {z} from "zod";
import {getMaterialHistory} from "@/app/history/[materialId]/getUserMaterialData";
import {FadingIn} from "@/components/Animators/FadingIn";
import {CenterContent} from "@/components/Layouts/CenterContent";
import FramedDiv from "../../../../component/Layout/FramedDiv";
import {MaterialLogsInput} from "@/app/history/[materialId]/materialLogsInput";
import {redirect} from "next/navigation";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {PageTitle} from "@/components/UI/Theme/PageTitle";

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const material = await getMaterialHistory(Number(parsedParams.materialId));

    if (!material.getLogs().isEmpty()) {redirect("/history/" + material.id)}

    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={material.toString(false, true) + " history"}/>
                <FramedDiv sides={true} style={{width: "75%"}}>
                    <SectionTitle title={"Create a " + material.toString(false, true) + " log"}/>
                    <div style={{width: "75%", display: "flex"  , alignContent: "center"}}>
                        <MaterialLogsInput defaultQuantity={0} materialId={material.id}/>
                    </div>
                </FramedDiv>
            </CenterContent>
        </FadingIn>
    </>
}