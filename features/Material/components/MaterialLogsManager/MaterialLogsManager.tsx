import FramedDiv from "../../../../component/Layout/FramedDiv";
import {SectionTitle} from "../../../../component/pageComponents/Theme/Theme";
import {Col, Row} from "react-bootstrap";
import {MaterialLogsManagerInputForm} from "./MaterialLogsManagerInputForm";
import {LoadingComponent} from "../../../../component/App Components/PageLoadingComponent";
import {useMaterialWithLogsFromRouter} from "../../hooks/useMaterialWithLogsFromRouter";

/** Component that allow the user to manage and log the material count */
export function MaterialLogsManager() {
    // Get the material
    const material = useMaterialWithLogsFromRouter();
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    return <>
        <FramedDiv sides={true}>
            <SectionTitle title={material.name + " logs"}></SectionTitle>

            <Row>
                <Col lg={6} className={"display-flex align-content-center"}>
                    <p className={"text-"}>You have currently
                        have {material.logs.getCurrentCount()} {material.name}</p>
                </Col>
                <Col lg={6}>
                    <MaterialLogsManagerInputForm/>
                </Col>
            </Row>
        </FramedDiv>
    </>;
}