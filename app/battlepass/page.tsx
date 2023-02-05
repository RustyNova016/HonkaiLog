import {FadingIn} from "@/components/Animators/FadingIn";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {PageTitle} from "../../component/pageComponents/Theme/Theme";
import FramedDiv from "../../component/Layout/FramedDiv";
import {BattlepassSummary} from "@/app/battlepass/battlepassSummary";

export default async function Page() {
    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={"Battlepass"}/>
                <FramedDiv sides={true} style={{width: "75%"}}>
                    <BattlepassSummary/>
                </FramedDiv>
            </CenterContent>
        </FadingIn>
    </>
}

