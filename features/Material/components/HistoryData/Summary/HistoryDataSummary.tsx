import {NoDataErrorComponent} from "../../../../../component/App Components/Errors/NoDataErrorComponent";
import {MaterialLogCollection} from "@/utils/Objects/MaterialLogCollection";
import {Col, Row} from "react-bootstrap";
import {NetValuesInfo} from "./NetValuesInfo";
import {AverageValuesInfo} from "./AverageValuesInfo";

export interface LogsProp {
    /** Logs of the timeframe to expose */
    logs: MaterialLogCollection
}

export function HistoryDataSummary({logs}: LogsProp) {
    if (logs.isEmpty()) return <NoDataErrorComponent/>

    return <>
        <Row>
            <h4>Summary of this period:</h4>
        </Row>

        <Row>
            <Col>
                <NetValuesInfo logs={logs}/>
            </Col>
            <Col>
                <AverageValuesInfo logs={logs}/>
            </Col>
        </Row>
    </>;
}

