import ContentDiv from "../../Layout/ContentDiv";
import {SectionTitle} from "../../pageComponents/Theme/Theme";
import {Col, Row} from "react-bootstrap";
import {MaterialLogInputForm} from "./MaterialLogInputForm";
import {LoadingComponent} from "../../App Components/PageLoadingComponent";
import {useMaterialLogORM} from "../../../features/Material/hooks/useMaterialLogORM";

/** Component that allow the user to log the material count */
export function MaterialLogger() {
    // Get the material
    const material = useMaterialLogORM(1);
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    return <>
        <ContentDiv sides={true}>
            <SectionTitle title={material.name + " logs"}></SectionTitle>

            <Row>
                <Col lg={6} className={"display-flex align-content-center"}>
                    <p className={"text-"}>You have currently
                        have {material.logs.getCurrentCount()} {material.name}</p>
                </Col>
                <Col lg={6}>
                    <MaterialLogInputForm/>
                </Col>
            </Row>
        </ContentDiv>
    </>;
}