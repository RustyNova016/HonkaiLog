import FramedDiv from "../../../component/Layout/FramedDiv";
import {SectionTitle} from "../../../component/pageComponents/Theme/Theme";
import {useState} from "react";
import {removeDaysFromToday} from "../../../tools/Miscs";
import {Col, Row} from "react-bootstrap";
import {TimeFrameSelect} from "../../../component/pages/History/TimeFrameSelect";
import {LoadingComponent} from "../../../component/App Components/PageLoadingComponent";
import {useMaterialWithLogsFromRouter} from "../../Material/hooks/useMaterialWithLogsFromRouter";
import {GachaBannerWithUserData} from "../../../tools/Models/GachaBannerWithUserData";
import {TimeTools} from "../../../utils/TimeTools";
import {useGachaBannerWithUserData} from "../hooks/UseGachaBannerWithUserData";

function GachaBannerInfo(props: { gachaBanner: GachaBannerWithUserData }) {
    const gachaBanner = props.gachaBanner
    return <Row>
        <p>{gachaBanner.name} gacha banner:</p>

        <p>
            You have enough to do {gachaBanner.calcNBPullsPossible()} pulls, which
            is {gachaBanner.calcPercentageAchievable()}% of the banner complete.
        </p>

        <p>
            With your current average gains, you will be able to get
            enough {gachaBanner.pullCost.material.name} to complete the gacha
            in {gachaBanner.calcTimeUntilEnoughFunds()} days, AKA
            the {TimeTools.AddDaysToDate(new Date(), gachaBanner.calcTimeUntilEnoughFunds()).toLocaleString()}
        </p>

    </Row>;
}

export function GachaData() {
    // Get the material
    const material = useMaterialWithLogsFromRouter();
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    const [lowerDate, setLowerDate] = useState<Date>(removeDaysFromToday(1));

    const expaBanner = useGachaBannerWithUserData(1)

    if (expaBanner === undefined) return <LoadingComponent/>

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