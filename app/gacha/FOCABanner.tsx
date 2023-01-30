"use client"
import {MaterialQuantity} from "@/utils/Objects/Material/MaterialQuantity";
import {useState} from "react";
import {GachaBanner} from "@/utils/Objects/Gacha/GachaBanner";
import FramedDiv from "../../component/Layout/FramedDiv";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {Form} from "react-bootstrap";

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

export function FOCABanner(props: { pullCost: MaterialQuantity }) {
    const [nbPulls, setNbPulls] = useState(0);
    const [nbItemGotten, setNbItemGotten] = useState(0);

    const gachaBanner = new GachaBanner(
        "FOCA Supply",
        50,
        4,
        props.pullCost
    )

    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <FOCABannerHeader gachaBanner={gachaBanner} value={nbPulls}
                              onChange={event => setNbPulls(parseInt(event.target.value))} value1={nbItemGotten}
                              onChange1={event => setNbItemGotten(parseInt(event.target.value))}/>
        </FramedDiv>
    </>
}