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
import {Form} from "react-bootstrap";

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

    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>

            <div className={"flex flex-col justify-content-between align-content-center my-3"}
                 style={{paddingLeft: 20}}>
                <h3 className={"mb-2"} style={{fontSize: "1.5em"}}><u>{gachaBanner.name}</u></h3>

            </div>
            <>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label label="Guarranty" className="mb-3"></Form.Label>
                        <Form.Control type="number"
                                      placeholder="name@example.com"
                                      value={nbPulls}
                                      onChange={event => setNbPulls(parseInt(event.target.value))}/>
                    </Form.Group>
                </Form>
            </>

            {
                !bannerCalculator.canCompleteGacha() ?
                    <p>
                        - You have enough for {bannerCalculator.getNbrOfPullsPossible()} pulls <br/>
                        - You can complete {bannerCalculator.getPercentageAchievable()} % of the banner, which is a
                        total
                        of {bannerCalculator.getTotalAmountOfPullsOnBanner()} pulls
                        / {gachaBanner.calcNBPullsForBannerCompletion()}<br/>

                        - With your current gains, you'll be able to collect enough founds to finish the banner in {bannerCalculator.getNumberOfDaysForCompletionFunds()} days
                    </p>
                    :
                    <>
                        You can complete the banner
                    </>
            }
        </FramedDiv>
    </>;
}

