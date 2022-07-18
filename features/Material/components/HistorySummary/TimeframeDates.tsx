import {useContext} from "react";
import {TimeframeContext} from "../../../../context/TimeframeContext";
import {Alert, Row} from "react-bootstrap";

/** Show the start and end date to the user */
export function TimeframeDates() {
    const {timeframe} = useContext(TimeframeContext);

    return <>
        Showing data from the {timeframe.start.toLocaleString()} to {timeframe.end.toLocaleString()}
    </>;
}

/** Show the start and end date to the user in an alert */
export function TimeframeDatesAlert() {
    return <Row>
        <Alert variant={"info"}><TimeframeDates/></Alert>
    </Row>
}