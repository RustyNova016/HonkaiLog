"use client"
import FramedDiv from "../../component/Layout/FramedDiv";
import {useState} from "react";
import {GachaBannerCalculator} from "@/utils/entities/Gacha/GachaBannerCalculator";
import {z} from "zod";
import {GachaBannerJSON} from "@/lib/Zod/Validations/GachaBannerJSONZod";
import {GachaBanner} from "@/utils/entities/Gacha/GachaBanner";
import {MaterialQuantityJSONZod} from "@/utils/entities/Material/validations/MaterialQuantity.JSONZod";
import {MaterialQuantity} from "@/utils/entities/Material/MaterialQuantity";
import {GachaBannerSummaryHeader} from "@/app/gacha/gachaBannerSummaryHeader";
import {IncompleteBannerBody} from "@/app/gacha/incompleteBannerBody";
import dayjs from "dayjs";
import {MaterialHistoryCalculatorJSONZod} from "@/utils/entities/Material/validations/MaterialHistoryCalculator.JSONZod";
import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";

export interface GachaBannerSummaryProps {
    bannerJSON: GachaBannerJSON
    currentInventory: z.infer<typeof MaterialQuantityJSONZod>
    materialCalculator: z.infer<typeof MaterialHistoryCalculatorJSONZod>
}

export function GachaBannerSummary(props: GachaBannerSummaryProps) {
    const [nbPulls, setNbPulls] = useState(100);

    const gachaBanner = GachaBanner.parse(props.bannerJSON);
    const currentInventory = MaterialQuantity.parse(props.currentInventory);
    const historyCalculator = MaterialHistoryCalculator.parse(props.materialCalculator);

    const bannerCalculator = new GachaBannerCalculator(gachaBanner, historyCalculator, currentInventory, gachaBanner.nbPullsForGuaranty - nbPulls, 0)

    const nextBannerCalculator = new GachaBannerCalculator(gachaBanner, historyCalculator, bannerCalculator.getRemainingInventory(), 0, 0)

    console.log("next banner inventory", nextBannerCalculator.currentInventory)

    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <GachaBannerSummaryHeader gachaBanner={gachaBanner} value={nbPulls}
                                      setNbPulls={setNbPulls}/>

            {
                !bannerCalculator.canCompleteGacha() ?
                    <IncompleteBannerBody bannerCalculator={bannerCalculator} gachaBanner={gachaBanner}/>
                    :
                    <p>
                        - You can complete the banner
                    </p>
            }

            <h3>Next banner</h3>

            <p>
                - You will be able to complete the next banner
                in {bannerCalculator.getNumberOfDaysForCompletionFunds() + nextBannerCalculator.getNumberOfDaysForCompletionFunds()} days,
                aka the {
                dayjs()
                    .add(bannerCalculator.getNumberOfDaysForCompletionFunds(), "day")
                    .add(nextBannerCalculator.getNumberOfDaysForCompletionFunds(), "day")
                    .format('DD/MM/YYYY')
            }
            </p>
        </FramedDiv>
    </>;
}

