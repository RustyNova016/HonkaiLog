"use client"
import {MaterialQuantity} from "@/utils/entities/Material/MaterialQuantity";
import {useState} from "react";
import {GachaBanner} from "@/utils/entities/Gacha/GachaBanner";
import FramedDiv from "../../component/Layout/FramedDiv";
import {GachaBannerCalculator} from "@/utils/entities/Gacha/GachaBannerCalculator";
import {z} from "zod";
import {MaterialQuantityJSONZod} from "@/utils/entities/Material/validations/MaterialQuantity.JSONZod";
import {IncompleteBannerBody} from "@/app/gacha/incompleteBannerBody";
import dayjs from "dayjs";
import {FOCABannerHeader} from "@/app/gacha/FOCABannerHeader";
import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";
import {MaterialHistoryCalculatorJSONZod} from "@/utils/entities/Material/validations/MaterialHistoryCalculator.JSONZod";

interface FOCABannerParams {
    pullCost: z.infer<typeof MaterialQuantityJSONZod>;
    currentInventory: z.infer<typeof MaterialQuantityJSONZod>
    materialCalculator: z.infer<typeof MaterialHistoryCalculatorJSONZod>
}

export function FOCABanner(props: FOCABannerParams) {
    const [nbPulls, setNbPulls] = useState(0);
    const [nbItemGotten, setNbItemGotten] = useState(0);

    const FOCAGachaBanner = new GachaBanner(
        "FOCA Supply",
        50,
        4,
        MaterialQuantity.parse(props.pullCost)
    )
    const currentInventory = MaterialQuantity.parse(props.currentInventory);
    const historyCalculator = MaterialHistoryCalculator.parse(props.materialCalculator);

    const bannerCalculator = new GachaBannerCalculator(
        FOCAGachaBanner,
        historyCalculator,
        currentInventory,
        nbPulls,
        nbItemGotten,
    )

    const nextBannerCalculator = new GachaBannerCalculator(
        FOCAGachaBanner,
        historyCalculator,
        bannerCalculator.getRemainingInventory()
    )

    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <FOCABannerHeader gachaBanner={FOCAGachaBanner} value={nbPulls}
                              setNbPulls={setNbPulls} value1={nbItemGotten}
                              setNbItemGotten={setNbItemGotten}/>

            {
                !bannerCalculator.canCompleteGacha() ?
                    <IncompleteBannerBody bannerCalculator={bannerCalculator} gachaBanner={FOCAGachaBanner}/>
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
    </>
}