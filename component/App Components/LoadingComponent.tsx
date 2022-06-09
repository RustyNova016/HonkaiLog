import {Spinner} from "react-bootstrap";
import {CenteredDiv} from "../Layout/CenteredDiv";
import ContentDiv from "../pageComponents/ContentDiv";

export function LoadingComponent() {
    return <CenteredDiv>
        <ContentDiv sides={true}>
            <Spinner animation="border" variant="primary" /><br/>
            <p style={{textAlign: "center"}}>Loading...</p>
        </ContentDiv>
    </CenteredDiv>;
}