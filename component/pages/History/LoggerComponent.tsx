import ContentDiv from "../../Layout/ContentDiv";
import {SectionTitle} from "../../pageComponents/Theme/Theme";
import {Col, Row} from "react-bootstrap";
import {MaterialLogInput} from "./MaterialLogInput";
import {useContext} from "react";
import {MaterialContext} from "./MaterialHistoryIDData";
import {PageLoadingComponent} from "../../App Components/PageLoadingComponent";

export function LoggerComponent() {
    // Get the material
    const material = useContext(MaterialContext)
    if (material === undefined || material.logs === "loading") return <PageLoadingComponent/>;

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