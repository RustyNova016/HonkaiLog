import {GachaBannerCalculator} from "@/utils/entities/Gacha/GachaBannerCalculator";
import GachaCardStyles from "@/components/UI/Gacha/GachaCard.module.scss";
import {DataCard} from "@/components/UI/Cards/DataCard";
import {MaterialIcon} from "@/components/material/MaterialIcon";

export function GachaCardBody(props: { bannerCalculator: GachaBannerCalculator }) {

    return <>
        <div className={GachaCardStyles["GachaCardBody"]}>
            <DataCard accented={props.bannerCalculator.getInventoryPullCount()}
                      title={"Possible Pulls"} className={GachaCardStyles["GachaInfo"]}
                      children={`You're able to do ${props.bannerCalculator.getInventoryPullCount()} pulls on this banner`}/>

            <DataCard accented={props.bannerCalculator.getPercentageAchievable() + "%"}
                                  title={"Completion Percentage"} className={GachaCardStyles["GachaInfo"]}
                                  children={`You can complete ${props.bannerCalculator.getPercentageAchievable()} % of the banner (${props.bannerCalculator.bannerAfterSpending.pullCount} / ${props.bannerCalculator.bannerType.calcNBPullsForBannerCompletion()})`}/>

            <DataCard accented={<>{props.bannerCalculator.getMissingCostForCompletion().quantity}
                <MaterialIcon material={props.bannerCalculator.getMainCostMaterial()} style={{height: "1em"}}/>
            </>}
                      title={props.bannerCalculator.getMainCostMaterial().toString(true, true) + " needed to finish"}
                      className={GachaCardStyles["GachaInfo"]}
                      children={`You're able to do ${props.bannerCalculator.getInventoryPullCount()} pulls on this banner`}/>

            <DataCard accented={props.bannerCalculator.getInventoryPullCount()}
                                  title={"Remaining days until completion"} className={GachaCardStyles["GachaInfo"]}
                                  children={`You're able to do ${props.bannerCalculator.getInventoryPullCount()} pulls on this banner`}/>


            {/*- With your current gains, you'll be able to collect enough founds to finish the banner
        in {props.bannerCalculator.getNumberOfDaysForCompletionFunds()} days, aka the {
        dayjs().add(props.bannerCalculator.getNumberOfDaysForCompletionFunds(), "day").format('DD/MM/YYYY')}*/}
        </div>
    </>;
}