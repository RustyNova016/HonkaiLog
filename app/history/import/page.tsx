import {FadingIn} from "@/components/Animators/FadingIn";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {PageTitle} from "@/components/UI/Theme/PageTitle";
import {ImportAuthkeyInput} from "@/app/history/import/importAuthkeyInput";
import {getIdUserServer} from "@/lib/NextAuth/GetSession";

export default async function Page() {

    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={"History Import"}/>

                <ImportAuthkeyInput idUser={await getIdUserServer()}/>
            </CenterContent>
        </FadingIn>
    </>
}