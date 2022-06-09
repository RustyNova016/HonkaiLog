import {createContext} from "react";
import {MaterialHistory} from "../../../tools/Database/MaterialHistory";
import {useMaterialLogs} from "../../../tools/Database/Data Hooks/useMaterialLogs";
import {LoadingComponent} from "../../App Components/LoadingComponent";
import {Col, Container} from "react-bootstrap";
import {PageTitle} from "../../pageComponents/Theme/Theme";
import ContentDiv from "../../pageComponents/ContentDiv";
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
                <PageTitle title={materialLogs.name + " history"}></PageTitle>

                <ContentDiv sides={true}>
                    <Col>
                        <p>You have currently have {history.getCurrentCount()} {history.name}</p>
                    </Col>

                </ContentDiv>

                <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                    <DataCharts materialLogs={materialLogs}/>
                </ErrorBoundary>

            </Container>
        </HistoryContext.Provider>
    </>
}