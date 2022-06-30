import {Alert} from "react-bootstrap";

export function NoDataErrorComponent() {
    return <Alert variant={"danger"} style={{margin: "10px"}}>No data to display.</Alert>;
}