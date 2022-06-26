import {useContext, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {removeDaysFromToday} from "../../../tools/Miscs";
import {SectionTitle} from "../../pageComponents/Theme/Theme";
import ContentDiv from "../../Layout/ContentDiv";
import {MaterialHistoryGraph} from "./MaterialHistoryGraph";
import {TimeFrameSelect} from "./TimeFrameSelect";
import {SelectGraphType} from "./SelectGraphType";
import {MaterialLogsGraph} from "../../../tools/MaterialLogsGraph";
import {MaterialContext} from "../../Contexts/MaterialContext";

export interface DataChartsProps {
}

export type GraphType = "count" | "gains" | "averages";

export function DataCharts(props: DataChartsProps) {
    // Get the material
    const material = useContext(MaterialContext)
    const materialLogsGraph = new MaterialLogsGraph(material)
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
                <SelectGraphType graphTypeHook={setGraphType} materialLogsGraph={materialLogsGraph}/>
            </Col>
        </Row>

        <p>Showing count from the {lowerDate.toLocaleString()} to {upperDate.toLocaleString()}</p>

        <MaterialHistoryGraph series={materialLogsGraph.getGraphData(graphType, lowerDate, upperDate)}/>
    </ContentDiv>;
}