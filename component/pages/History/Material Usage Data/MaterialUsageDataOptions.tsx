import {MaterialLogsGraph} from "../../../../tools/MaterialLogsGraph";
import {Col, Row} from "react-bootstrap";
import {TimeFrameSelect} from "../TimeFrameSelect";
import {SelectGraphType} from "../SelectGraphType";

export interface MaterialUsageDataOptionsProps {
    dateHook: (value: (((prevState: Date) => Date) | Date)) => void;
    graphTypeHook: (value: (((prevState: ("count" | "gains" | "averages")) => ("count" | "gains" | "averages")) | "count" | "gains" | "averages")) => void;
    materialLogsGraph: MaterialLogsGraph;
}

export function MaterialUsageDataOptions(props: MaterialUsageDataOptionsProps) {
    return <Row>
        <Col lg={6}>
            <TimeFrameSelect dateHook={props.dateHook}/>
        </Col>
        <Col lg={6}>
            <SelectGraphType graphTypeHook={props.graphTypeHook} materialLogsGraph={props.materialLogsGraph}/>
        </Col>
    </Row>;
}