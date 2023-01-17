import {z} from "zod";
import {getMaterialWithUserData} from "@/app/history/[materialId]/getUserMaterialData";
import {FadingIn} from "@/components/Animators/FadingIn";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {PageTitle, SectionTitle} from "../../../../component/pageComponents/Theme/Theme";
import FramedDiv from "../../../../component/Layout/FramedDiv";
import {MaterialLogsInput} from "@/app/history/[materialId]/materialLogsInput";
import {redirect} from "next/navigation";

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const material = await getMaterialWithUserData(Number(parsedParams.materialId));

    if (!material.getLogs().isEmpty()) {redirect("/history/" + material.id)}

    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={material.getName(false, true) + " history"}/>
                <FramedDiv sides={true} style={{width: "75%"}}>
                    <SectionTitle title={"Create a " + material.getName(false, true) + " log"}/>
                    <div style={{width: "75%", display: "flex"  , alignContent: "center"}}>
                        <MaterialLogsInput defaultQuantity={0} materialId={material.id}/>
                    </div>
                </FramedDiv>
            </CenterContent>
        </FadingIn>
    </>
}