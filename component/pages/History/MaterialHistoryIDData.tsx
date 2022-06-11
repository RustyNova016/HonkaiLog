import {createContext} from "react";
import {MaterialHistory} from "../../../tools/Database/MaterialHistory";
import {useMaterialLogs} from "../../../tools/Database/Data Hooks/useMaterialLogs";
import {LoadingComponent} from "../../App Components/LoadingComponent";
import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {SectionTitle} from "../../pageComponents/Theme/Theme";
import ContentDiv from "../../Layout/ContentDiv";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback, ErrorHandler} from "../../App Components/ErrorFallback";
import {DataCharts} from "./DataCharts";

export interface MaterialHistoryIDDataProps {
    MaterialID: number;
}

export const HistoryContext = createContext<MaterialHistory | undefined>(undefined as MaterialHistory | undefined);

export function MaterialHistoryIDData(props: MaterialHistoryIDDataProps) {
    const {isError, isLoading, materialLogs} = useMaterialLogs(props.MaterialID);

    if (isLoading || materialLogs === undefined) {
        return <LoadingComponent/>;
    }

    if (isError) {
        return <div>Error!</div>;
    }

    const history = new MaterialHistory(materialLogs);

    return <>
        <HistoryContext.Provider value={history}>
            <Container>
                <SectionTitle title={materialLogs.name + " history"}></SectionTitle>

                <ContentDiv sides={true}>
                    <SectionTitle title={materialLogs.name + " count"}></SectionTitle>
                    <Row>
                        <Col lg={6}>
                            <p>You have currently have {history.getCurrentCount()} {history.name}</p>
                        </Col>
                        <Col lg={6}>
                            <InputGroup className="mb-3">
                                <FormControl value={history.getCurrentCount()}></FormControl>
                                <Button id="button-addon2">
                                    Save
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>

                </ContentDiv>

                <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                    <DataCharts/>
                </ErrorBoundary>

            </Container>
        </HistoryContext.Provider>
    </>
}