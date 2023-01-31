"use client"
import {MaterialQuantity} from "@/utils/Objects/Material/MaterialQuantity";
import {useState} from "react";
import {GachaBanner} from "@/utils/Objects/Gacha/GachaBanner";
import FramedDiv from "../../component/Layout/FramedDiv";
import {GachaBannerCalculator} from "@/utils/Objects/Gacha/GachaBannerCalculator";
import {z} from "zod";
import {MaterialQuantityJSONZod} from "@/lib/Zod/Validations/MaterialQuantityJSONZod";
import {UserMaterialJSONZod} from "@/lib/Zod/Validations/UserMaterial";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {IncompleteBannerBody} from "@/app/gacha/incompleteBannerBody";
import dayjs from "dayjs";
import {FOCABannerHeader} from "@/app/gacha/FOCABannerHeader";

interface FOCABannerParams {
    pullCost: z.infer<typeof MaterialQuantityJSONZod>;
    currentInventory: z.infer<typeof MaterialQuantityJSONZod>
    idUser: string //Todo: Find a more elegant way
    materialUsageData: z.infer<typeof UserMaterialJSONZod>
}

export function FOCABanner(props: FOCABannerParams) {
    const [nbPulls, setNbPulls] = useState(0);
    const [nbItemGotten, setNbItemGotten] = useState(0);

    const gachaBanner = new GachaBanner(
        "FOCA Supply",
        50,
        4,
        MaterialQuantity.parse(props.pullCost)
    )

    const bannerCalculator = new GachaBannerCalculator(
        gachaBanner,
        MaterialQuantity.parse(props.currentInventory),
        MaterialHistory.parse(props.materialUsageData, props.idUser),
        nbPulls,
        nbItemGotten
    )

    const nextBannerCalculator = new GachaBannerCalculator(
        gachaBanner,
        bannerCalculator.getRemainingInventory(),
        MaterialHistory.parse(props.materialUsageData, props.idUser)
    )

    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <FOCABannerHeader gachaBanner={gachaBanner} value={nbPulls}
                              setNbPulls={setNbPulls} value1={nbItemGotten}
                              setNbItemGotten={setNbItemGotten}/>

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
    </>
}