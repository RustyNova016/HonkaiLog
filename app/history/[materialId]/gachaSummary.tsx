import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {MaterialQuantityWithUserData} from "../../../tools/Models/MaterialQuantityWithUserData";
import {GachaBannerWithUserData} from "../../../tools/Models/GachaBannerWithUserData";
import FramedDiv from "../../../component/Layout/FramedDiv";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";

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

export function GachaSummary(props: { material: MaterialHistory }) {
    const materialQuantityWithUserData = new MaterialQuantityWithUserData(props.material, 280);
    const gachaBanner = new GachaBannerWithUserData("Test Character Banner", 100, 1, materialQuantityWithUserData, 0)
    const gachaGearBanner = new GachaBannerWithUserData("Test Gear Banner", 50, 4, materialQuantityWithUserData, 0)

    return <FramedDiv sides={true} style={{width: "75%"}}>

        <SectionTitle title={"Gacha"}/>

        <GachaBannerSummary gachaBanner={gachaBanner}/>
        <GachaBannerSummary gachaBanner={gachaGearBanner}/>
    </FramedDiv>;
}