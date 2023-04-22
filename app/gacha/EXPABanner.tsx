"use client"
import {MaterialInfo} from "@/utils/types/materials/MaterialInfo";
import {useState} from "react";
import {GachaBannerCalculator} from "@/utils/entities/Gacha/GachaBannerCalculator";
import FramedDiv from "../../component/Layout/FramedDiv";
import {MaterialBuilder} from "@/utils/entities/Material/MaterialBuilder";
import {EXPABanner} from "../../data/theme/gacha/GachaBanners";
import {GachaCard} from "@/components/UI/Gacha/GachaCard";

export interface EXPABannerProps {
    materialInfo: MaterialInfo[]
}

export function EXPABannerComponent(props: EXPABannerProps) {
    const [gachaBanner] = useState(
        new GachaBannerCalculator(EXPABanner, MaterialBuilder.convertToEntitiesCollection(props.materialInfo).histories)
    );


    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <GachaCard banner={gachaBanner}/>
            {/*<GachaBannerSummaryHeader gachaBanner={EXPABanner} value={nbPulls} setNbPulls={setNbPulls}/>

            {
                !gachaBanner.canCompleteGacha() ?
                    <GachaCardBody bannerCalculator={gachaBanner}/>
                    :
                    <p>
                        - You can complete the banner
                    </p>
            }*/}

            {/*<h3>Next banner</h3>

            <p>
                - You will be able to complete the next banner
                in {bannerCalculator.getNumberOfDaysForCompletionFunds() + nextBannerCalculator.getNumberOfDaysForCompletionFunds()} days,
                aka the {
                dayjs()
                    .add(bannerCalculator.getNumberOfDaysForCompletionFunds(), "day")
                    .add(nextBannerCalculator.getNumberOfDaysForCompletionFunds(), "day")
                    .format('DD/MM/YYYY')
            }
            </p>*/}
        </FramedDiv>
    </>;
}
