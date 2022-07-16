import FramedDiv from "../../../component/Layout/FramedDiv";
import {SectionTitle} from "../../../component/pageComponents/Theme/Theme";
import {useState} from "react";
import {removeDaysFromToday, TimeTools} from "../../../tools/Miscs";
import {Col, Row} from "react-bootstrap";
import {TimeFrameSelect} from "../../../component/pages/History/TimeFrameSelect";
import {LoadingComponent} from "../../../component/App Components/PageLoadingComponent";
import {useMaterialWithLogsFromRouter} from "../../Material/hooks/useMaterialWithLogsFromRouter";
import {GachaBannerWithLogs} from "../../../tools/Models/GachaBannerWithLogs";
import {MaterialQuantityWithLogs} from "../../../tools/Models/MaterialQuantityWithLogs";

function GachaBannerInfo(props: { gachaBanner: GachaBannerWithLogs }) {
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
    const material = useMaterialWithLogsFromRouter();
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    const [lowerDate, setLowerDate] = useState<Date>(removeDaysFromToday(1));

    const expaBanner = new GachaBannerWithLogs("EXPA", 100, 1, new MaterialQuantityWithLogs(material, 280))

    return <FramedDiv sides={true}>
        <SectionTitle title={"Gacha"}></SectionTitle>

        <Row>
            <Col lg={6}>
                <TimeFrameSelect dateHook={setLowerDate}/>
            </Col>
        </Row>

        <GachaBannerInfo gachaBanner={expaBanner}/>
    </FramedDiv>;
}