import {DataCard} from "@/components/UI/Cards/DataCard";
import {GachaBannerCalculator} from "@/utils/entities/Gacha/GachaBannerCalculator";

export function IncompleteBannerBody(props: { bannerCalculator: GachaBannerCalculator }) {
    return <div style={{display: "flex", flexDirection: "row"}}>
        <DataCard accented={props.bannerCalculator.getInventoryPullCount()}
                  title={"Possible Pulls"} style={{width: "40%"}}
                  children={`You're able to do ${props.bannerCalculator.getInventoryPullCount()} pulls on this banner`}/>

        <DataCard accented={props.bannerCalculator.getInventoryPullCount()}
                  title={props.bannerCalculator.getMainCostMaterial().name + "needed"} style={{width: "40%"}}
                  children={`You're able to do ${props.bannerCalculator.getInventoryPullCount()} pulls on this banner`}/>

        <DataCard accented={props.bannerCalculator.getPercentageAchievable() + "%"}
                  title={"Completion Percentage"} style={{width: "40%"}}
                  children={`You can complete ${props.bannerCalculator.getPercentageAchievable()} % of the banner (${props.bannerCalculator.getPossibleTotalPullCount()} / ${props.bannerCalculator.gachaBanner.calcNBPullsForBannerCompletion()})`}/>


        {/*- With your current gains, you'll be able to collect enough founds to finish the banner
        in {props.bannerCalculator.getNumberOfDaysForCompletionFunds()} days, aka the {
        dayjs().add(props.bannerCalculator.getNumberOfDaysForCompletionFunds(), "day").format('DD/MM/YYYY')}*/}
    </div>;
}