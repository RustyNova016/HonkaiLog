"use client"
import {GachaBannerCalculator} from "@/utils/entities/Gacha/GachaBannerCalculator";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import GachaCardStyles from "@/components/UI/Gacha/GachaCard.module.scss";
import {useState} from "react";
import {GachaCardInput} from "@/components/UI/Gacha/GachaCardInput";
import {GachaCardBody} from "@/components/UI/Gacha/GachaCardBody";

export function GachaCard(props: {banner: GachaBannerCalculator}) {
    const [nbPulls, setNbPulls] = useState(100);
    props.banner.currentPityCounter = nbPulls

    return <div className={GachaCardStyles["GachaCard"]}>
        <SectionTitle title={props.banner.gachaBanner.name}/>

        <GachaCardInput value={nbPulls} setter={setNbPulls} min={0} max={props.banner.gachaBanner.nbPullsForGuaranty} label={"Number of pulls"}/>

        <GachaCardBody bannerCalculator={props.banner}/>
    </div>
}