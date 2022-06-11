import {useContext, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {removeDaysFromToday} from "../../../tools/miscs";
import {SectionTitle} from "../../pageComponents/Theme/Theme";
import ContentDiv from "../../Layout/ContentDiv";
import {MaterialHistoryGraph} from "./MaterialHistoryGraph";
import {LoadingComponent} from "../../App Components/LoadingComponent";
import {HistoryContext} from "./MaterialHistoryIDData";
import {TimeFrameSelect} from "./TimeFrameSelect";
import {SelectGraphType} from "./SelectGraphType";

export interface DataChartsProps {
}

export type GraphType = "count" | "gains" | "averages";

export function DataCharts(props: DataChartsProps) {
    const history = useContext(HistoryContext);

    if (history === undefined) {
        return <LoadingComponent/>
    }

    const [lowerDate, setLowerDate] = useState<Date>(removeDaysFromToday(1));
    const [upperDate, setUpperDate] = useState(new Date());
    const [graphType, setGraphType] = useState<GraphType>("count");

    return <ContentDiv sides={true}>
        <SectionTitle title={"Data Charts"}></SectionTitle>
        <Row>
            <Col lg={6}>
                <TimeFrameSelect dateHook={setLowerDate}/>
            </Col>
            <Col lg={6}>
                <SelectGraphType graphTypeHook={setGraphType} history={history}/>
            </Col>
        </Row>


        <p>Showing count from the {lowerDate.toLocaleString()} to {upperDate.toLocaleString()}</p>

        <MaterialHistoryGraph series={history.getGraphData(graphType, lowerDate, upperDate)}/>
    </ContentDiv>;
}