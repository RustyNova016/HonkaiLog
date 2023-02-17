import {FadingIn} from "@/components/Animators/FadingIn";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {PageTitle} from "@/components/UI/Theme/PageTitle";
import {ImportAuthkeyInput} from "@/app/history/import/importAuthkeyInput";

export default async function Page() {
    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={"History Import"}/>

                <ImportAuthkeyInput/>
            </CenterContent>
        </FadingIn>
    </>
}