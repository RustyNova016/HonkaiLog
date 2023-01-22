"use client"
import FramedDiv from "../../component/Layout/FramedDiv";
import {useState} from "react";
import {GachaBannerCalculator} from "../../tools/Models/GachaBannerCalculator";
import {z} from "zod";
import {GachaBannerJSON} from "@/lib/Zod/Validations/GachaBannerJSONZod";
import {GachaBanner} from "../../tools/Models/GachaBanner";
import {MaterialHistory} from "@/utils/Objects/MaterialHistory";
import {UserMaterialJSONZod} from "@/lib/Zod/Validations/UserMaterial";
import {MaterialQuantityJSONZod} from "@/lib/Zod/Validations/MaterialQuantityJSONZod";
import {MaterialQuantity} from "../../tools/Models/MaterialQuantity";
import {FloatingLabel, Form} from "react-bootstrap";

export interface GachaBannerSummaryProps {
    bannerJSON: GachaBannerJSON
    currentInventory: z.infer<typeof MaterialQuantityJSONZod>
    idUser: string //Todo: Find a more elegant way
    materialUsageData: z.infer<typeof UserMaterialJSONZod>
}

export function GachaBannerSummary(props: GachaBannerSummaryProps) {
    const [nbPulls, setNbPulls] = useState(100);

    const bannerCalculator = new GachaBannerCalculator(
        GachaBanner.parse(props.bannerJSON),
        MaterialQuantity.parse(props.currentInventory),
        MaterialHistory.parse(props.materialUsageData, props.idUser).getLogs()
    )

    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <>
                <FloatingLabel controlId="floatingInput" label="Guarranty" className="mb-3">
                    <Form.Control type="number" placeholder="name@example.com"/>
                </FloatingLabel>
            </>

            {
                !bannerCalculator.canCompleteGacha() ?
                    <p>
                        You currently can do {bannerCalculator.getNbrOfPullsPossible()} pull
                        on {bannerCalculator.gachaBanner.name}<br/>
                        Which is {/*{bannerCalculator.getPercentageAchievable()}*/}% of the banner<br/>
                        <br/>
                        With your current gains, you'll be able to collect enough founds to finish the banner the
                    </p>
                    :
                    <>
                        (You can complete the banner
                    </>
            }
        </FramedDiv>
    </>;
}

