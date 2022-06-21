import {createContext} from "react";
import {MaterialHistory} from "../../../tools/Database/MaterialHistory";
import {useMaterialLogs} from "../../../tools/Database/Data Hooks/useMaterialLogs";
import {PageLoadingComponent} from "../../App Components/PageLoadingComponent";
import {Col, Container, Row} from "react-bootstrap";
import {PageTitle, SectionTitle} from "../../pageComponents/Theme/Theme";
import ContentDiv from "../../Layout/ContentDiv";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback, ErrorHandler} from "../../App Components/ErrorFallback";
import {DataCharts} from "./DataCharts";
import {MaterialLogInput} from "./MaterialLogInput";

export interface MaterialHistoryIDDataProps {
    MaterialID: number;
}

export const HistoryContext = createContext<MaterialHistory | undefined>(undefined as MaterialHistory | undefined);

export function MaterialHistoryIDData(props: MaterialHistoryIDDataProps) {
    const {isError, isLoading, materialLogsResponse} = useMaterialLogs(props.MaterialID);

    if (isLoading) return <PageLoadingComponent/>;
    if (isError) return <div>Error!</div>;
    if (materialLogsResponse === undefined) return <div>Error! No material</div>;

    const history = new MaterialHistory(materialLogsResponse);

    return <>
        <HistoryContext.Provider value={history}>
            <Container>
                <PageTitle title={materialLogsResponse.name + " history"}></PageTitle>

                <ContentDiv sides={true}>
                    <SectionTitle title={materialLogsResponse.name + " logs"}></SectionTitle>
                    <Row>
                        <Col lg={6} className={"display-flex align-content-center"}>
                            <p className={"text-"}>You have currently
                                have {history.getCurrentCount()} {history.name}</p>
                        </Col>
                        <Col lg={6}>
                            <MaterialLogInput/>
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