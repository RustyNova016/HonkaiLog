import {z} from "zod";
import {getUserMaterialData, UserMaterialDataZod} from "./getUserMaterialData";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {FadingIn} from "@/components/Animators/FadingIn";


export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const material = await getUserMaterialData(parsedParams.materialId)

    console.log(material)
    console.log(UserMaterialDataZod.parse(material))

    return <>
        <CenterContent>
            <FadingIn>
                <div>Hello</div>
            </FadingIn>
        </CenterContent>
    </>
}