import {Alert} from "react-bootstrap";

export function NoDataErrorComponent() {
    return <Alert variant={"danger"} style={{margin: "0px", fontSize: "1em"}}>
        <i className="bi bi-exclamation-diamond"/> There's no data to display. Make a log or change the timeframe used
    </Alert>;
}