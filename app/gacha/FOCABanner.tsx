"use client"
import {MaterialQuantity} from "@/utils/Objects/Material/MaterialQuantity";
import {useState} from "react";
import {GachaBanner} from "@/utils/Objects/Gacha/GachaBanner";
import FramedDiv from "../../component/Layout/FramedDiv";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {Form} from "react-bootstrap";
import {GachaBannerCalculator} from "@/utils/Objects/Gacha/GachaBannerCalculator";
import {z} from "zod";
import {MaterialQuantityJSONZod} from "@/lib/Zod/Validations/MaterialQuantityJSONZod";
import {UserMaterialJSONZod} from "@/lib/Zod/Validations/UserMaterial";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {IncompleteBannerBody} from "@/app/gacha/incompleteBannerBody";
import dayjs from "dayjs";

interface FOCABannerHeaderProps {
    gachaBanner: GachaBanner;
    value: number;
    onChange: (event: any) => void;
    value1: number;
    onChange1: (event: any) => void;
}

function FOCABannerHeader(props: FOCABannerHeaderProps) {
    return <div className={"flex flex-row justify-content-between align-content-center"}>
        <SectionTitle title={props.gachaBanner.name}/>

        <div className={"flex flex-row align-items-center text-center"}>
            <>
                <>Nb of pulls made since last UP equipment in current session:</>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label label="Guarranty" className="mb-3"></Form.Label>
                        <Form.Control type="number"
                                      placeholder="name@example.com"
                                      value={props.value}
                                      onChange={props.onChange}/>
                    </Form.Group>
                </Form>
                <>Number of UP equipment gotten:</>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label label="Completion" className="mb-3"></Form.Label>
                        <Form.Control type="number"
                                      placeholder="name@example.com"
                                      value={props.value1}
                                      onChange={props.onChange1}/>
                    </Form.Group>
                </Form>
            </>
        </div>
    </div>;
}

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
        nbPulls
            //TODO: Add nb guarranties
    )

    const nextBannerCalculator = new GachaBannerCalculator(
        gachaBanner,
        MaterialQuantity.parse({
            material: props.currentInventory.material,
            quantity: props.currentInventory.quantity - bannerCalculator.getRemainingCostForCompletion().quantity
        }),
        MaterialHistory.parse(props.materialUsageData, props.idUser),
        0
    )

    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <FOCABannerHeader gachaBanner={gachaBanner} value={nbPulls}
                              onChange={event => setNbPulls(parseInt(event.target.value))} value1={nbItemGotten}
                              onChange1={event => setNbItemGotten(parseInt(event.target.value))}/>

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
                in {nextBannerCalculator.getNumberOfDaysForCompletionFunds()} days, aka the {
                dayjs()
                    .add(nextBannerCalculator.getNumberOfDaysForCompletionFunds(), "day")
                    .format('DD/MM/YYYY')
            }
            </p>
        </FramedDiv>
    </>
}