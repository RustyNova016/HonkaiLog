import ContentDiv from "../../Layout/ContentDiv";
import {SectionTitle} from "../../pageComponents/Theme/Theme";
import {Col, Row} from "react-bootstrap";
import {MaterialLogInput} from "./MaterialLogInput";
import {useContext} from "react";
import {MaterialContext} from "../../Contexts/MaterialContext";

export function LoggerComponent() {
    // Get the material
    const material = useContext(MaterialContext)

    return <ContentDiv sides={true}>
        <SectionTitle title={material.name + " logs"}></SectionTitle>
        <Row>
            <Col lg={6} className={"display-flex align-content-center"}>
                <p className={"text-"}>You have currently
                    have {material.logs.getCurrentCount()} {material.name}</p>
            </Col>
            <Col lg={6}>
                <MaterialLogInput/>
            </Col>
        </Row>
    </ContentDiv>;
}