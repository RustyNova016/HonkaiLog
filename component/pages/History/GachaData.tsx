import ContentDiv from "../../Layout/ContentDiv";
import {SectionTitle} from "../../pageComponents/Theme/Theme";
import {useContext, useState} from "react";
import {MaterialContext} from "./MaterialHistoryIDData";
import {PageLoadingComponent} from "../../App Components/PageLoadingComponent";
import {removeDaysFromToday} from "../../../tools/Miscs";
import {Col, Row} from "react-bootstrap";
import {TimeFrameSelect} from "./TimeFrameSelect";
import {GachaBanner} from "../../../tools/Models/GachaBanner";
import {MaterialQuantity} from "../../../tools/Models/MaterialQuantity";

export function GachaData() {
    // Get the material
    const material = useContext(MaterialContext)
    if (material === undefined || !material.hasLogs()) return <PageLoadingComponent/>;

    const [lowerDate, setLowerDate] = useState<Date>(removeDaysFromToday(1));

    const expaBanner = new GachaBanner("EXPA", new MaterialQuantity(material, 280), 100, 1)

    return <ContentDiv>
        <SectionTitle title={"Gacha"}></SectionTitle>

        <Row>
            <Col lg={6}>
                <TimeFrameSelect dateHook={setLowerDate}/>
            </Col>
        </Row>

        <Row>
            <p>{expaBanner.name} gacha banner:</p>


            <p>You have enough to do {expaBanner.getNBPullsPossible()} pulls, which is {expaBanner.getPercentageAchievable()}%
                of the banner. </p>


        </Row>
    </ContentDiv>;
}