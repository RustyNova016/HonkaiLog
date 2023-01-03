import {z} from "zod";
import {getMaterialWithUserData} from "./getUserMaterialData";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {FadingIn} from "@/components/Animators/FadingIn";
import {PageTitle} from "../../../component/pageComponents/Theme/Theme";
import {Suspense} from "react";
import {CenteredLoadingIcon} from "@/components/UI/Loading/LoadingIcon";
import MaterialLogsManager from "@/app/history/[materialId]/materialLogsManager";
import {HistorySummary} from "@/app/history/[materialId]/historySummary";
import FramedDiv from "../../../component/Layout/FramedDiv";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {GachaBannerWithUserData} from "../../../tools/Models/GachaBannerWithUserData";
import {MaterialQuantityWithUserData} from "../../../tools/Models/MaterialQuantityWithUserData";
import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";

function GachaBannerSummary(props: { gachaBanner: GachaBannerWithUserData }) {
    return <div className={"flex flex-col justify-content-between align-content-center my-3"} style={{paddingLeft: 20}}>
        <h3 className={"mb-2"} style={{fontSize: "1.5em"}}><u>{props.gachaBanner.name}</u></h3>
        <>
            - You have enough for {props.gachaBanner.calcNBPullsPossible()} pulls, which is a total
            of {props.gachaBanner.calcTotalPulls()} pulls / {props.gachaBanner.calcNBPullsForBannerCompletion()} <br/>
            - You can complete {props.gachaBanner.calcPercentageAchievable()} % of the banner
        </>
    </div>;
}

function GachaSummary(props: { material: MaterialWithUserData }) {
    const materialQuantityWithUserData = new MaterialQuantityWithUserData(props.material, 280);
    const gachaBanner = new GachaBannerWithUserData("Test Character Banner", 100, 1, materialQuantityWithUserData, 0)
    const gachaGearBanner = new GachaBannerWithUserData("Test Gear Banner", 50, 4, materialQuantityWithUserData, 0)

    return <FramedDiv sides={true} style={{width: "75%"}}>

        <SectionTitle title={"Gacha"}/>

        <GachaBannerSummary gachaBanner={gachaBanner}/>
        <GachaBannerSummary gachaBanner={gachaGearBanner}/>
    </FramedDiv>;
}

export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const material = await getMaterialWithUserData(Number(parsedParams.materialId));

    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={material.getName(false, true) + " history"}/>

                <Suspense fallback={<CenteredLoadingIcon/>}>
                    <MaterialLogsManager material={material}/>
                </Suspense>

                <HistorySummary materialJson={material.export()} idUser={material.userID}/>

                <GachaSummary material={material}/>
            </CenterContent>
        </FadingIn>
    </>
}