import ContentDiv from "../../../component/Layout/ContentDiv";
import {SectionTitle} from "../../../component/pageComponents/Theme/Theme";
import {useState} from "react";
import {removeDaysFromToday, TimeTools} from "../../../tools/Miscs";
import {Col, Row} from "react-bootstrap";
import {TimeFrameSelect} from "../../../component/pages/History/TimeFrameSelect";
import {GachaBanner} from "../../../tools/Models/GachaBanner";
import {MaterialQuantity} from "../../../tools/Models/MaterialQuantity";
import {useMaterialFromContext} from "../../Material/hooks/useMaterialFromContext";
import {LoadingComponent} from "../../../component/App Components/PageLoadingComponent";

function GachaBannerInfo(props: { gachaBanner: GachaBanner }) {
    const gachaBanner = props.gachaBanner
    return <Row>
        <p>{gachaBanner.name} gacha banner:</p>

        <p>
            You have enough to do {gachaBanner.getNBPullsPossible()} pulls, which
            is {gachaBanner.getPercentageAchievable()}% of the banner complete.
        </p>

        <p>
            With your current average gains, you will be able to get
            enough {gachaBanner.getGetCostMaterialName()} to complete the gacha
            in {gachaBanner.getDaysToFullCompletionFounds()} days, AKA
            the {TimeTools.AddDaysToDate(new Date(), gachaBanner.getDaysToFullCompletionFounds()).toLocaleString()}
        </p>

    </Row>;
}

export function GachaData() {
    // Get the material
    const material = useMaterialFromContext(true);
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    const [lowerDate, setLowerDate] = useState<Date>(removeDaysFromToday(1));

    const expaBanner = new GachaBanner("EXPA", new MaterialQuantity(material, 280), 100, 1)

    return <ContentDiv sides={true}>
        <SectionTitle title={"Gacha"}></SectionTitle>

        <Row>
            <Col lg={6}>
                <TimeFrameSelect dateHook={setLowerDate}/>
            </Col>
        </Row>

        <GachaBannerInfo gachaBanner={expaBanner}/>
    </ContentDiv>;
}