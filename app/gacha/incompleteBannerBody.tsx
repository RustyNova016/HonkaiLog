import {GachaBannerCalculator} from "@/utils/entities/Gacha/GachaBannerCalculator";
import {GachaBanner} from "@/utils/entities/Gacha/GachaBanner";
import dayjs from "dayjs";

export function IncompleteBannerBody(props: { bannerCalculator: GachaBannerCalculator, gachaBanner: GachaBanner }) {
    return <p>
        - You have enough currency for {props.bannerCalculator.getNbrOfPullsPossible()} pulls <br/>

        - You can complete {props.bannerCalculator.getPercentageAchievable()} % of the banner, which is a
        total
        of {props.bannerCalculator.getTotalAmountOfPullsOnBanner()} pulls
        / {props.gachaBanner.calcNBPullsForBannerCompletion()}<br/>

        - With your current gains, you'll be able to collect enough founds to finish the banner
        in {props.bannerCalculator.getNumberOfDaysForCompletionFunds()} days, aka the {
        dayjs().add(props.bannerCalculator.getNumberOfDaysForCompletionFunds(), "day").format('DD/MM/YYYY')}
    </p>;
}