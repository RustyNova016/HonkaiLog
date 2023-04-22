import {GachaBanner} from "@/utils/entities/Gacha/GachaBanner";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {z} from "zod";
import {GachaCardInput} from "@/components/UI/Gacha/GachaCardInput";

export function GachaBannerSummaryHeader(props: {
    gachaBanner: GachaBanner,
    value: number,
    setNbPulls: (event: any) => void
}) {
    return <div className={"flex flex-row justify-content-between align-content-center"}>
        <SectionTitle title={props.gachaBanner.name}/>

        <div className={"flex flex-row align-items-center text-center"}>
            <>
                <>Pulls left before pity:</>
                <GachaCardInput value={props.value} onChange={event => {
                    let num = z.number().parse(parseInt(event.target.value));
                    if (num < 1) {
                        props.setNbPulls(1);
                        return
                    }
                    if (num > 100) {
                        props.setNbPulls(100);
                        return
                    }
                    props.setNbPulls(num)
                }}/>
            </>
        </div>
    </div>;
}