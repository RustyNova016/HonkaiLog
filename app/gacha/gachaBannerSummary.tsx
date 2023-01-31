"use client"
import FramedDiv from "../../component/Layout/FramedDiv";
import {useState} from "react";
import {GachaBannerCalculator} from "@/utils/Objects/Gacha/GachaBannerCalculator";
import {z} from "zod";
import {GachaBannerJSON} from "@/lib/Zod/Validations/GachaBannerJSONZod";
import {GachaBanner} from "@/utils/Objects/Gacha/GachaBanner";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {UserMaterialJSONZod} from "@/lib/Zod/Validations/UserMaterial";
import {MaterialQuantityJSONZod} from "@/lib/Zod/Validations/MaterialQuantityJSONZod";
import {MaterialQuantity} from "@/utils/Objects/Material/MaterialQuantity";
import {GachaBannerSummaryHeader} from "@/app/gacha/gachaBannerSummaryHeader";
import {IncompleteBannerBody} from "@/app/gacha/incompleteBannerBody";
import dayjs from "dayjs";

export interface GachaBannerSummaryProps {
    bannerJSON: GachaBannerJSON
    currentInventory: z.infer<typeof MaterialQuantityJSONZod>
    idUser: string //Todo: Find a more elegant way
    materialUsageData: z.infer<typeof UserMaterialJSONZod>
}

export function GachaBannerSummary(props: GachaBannerSummaryProps) {
    const [nbPulls, setNbPulls] = useState(100);

    const gachaBanner = GachaBanner.parse(props.bannerJSON);
    const bannerCalculator = new GachaBannerCalculator(
        gachaBanner,
        MaterialQuantity.parse(props.currentInventory),
        MaterialHistory.parse(props.materialUsageData, props.idUser),
        gachaBanner.nbPullsForGuaranty - nbPulls
    )

    const nextBannerCalculator = new GachaBannerCalculator(
        gachaBanner,
        bannerCalculator.getRemainingInventory(),
        MaterialHistory.parse(props.materialUsageData, props.idUser),
        0
    )

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
                in {bannerCalculator.getNumberOfDaysForCompletionFunds() + nextBannerCalculator.getNumberOfDaysForCompletionFunds()} days, aka the {
                dayjs()
                    .add(bannerCalculator.getNumberOfDaysForCompletionFunds(), "day")
                    .add(nextBannerCalculator.getNumberOfDaysForCompletionFunds(), "day")
                    .format('DD/MM/YYYY')
            }
            </p>
        </FramedDiv>
    </>;
}

