import {Container} from "react-bootstrap";
import {PageTitle} from "../../../component/pageComponents/Theme/Theme";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback, ErrorHandler} from "../../../component/App Components/ErrorFallback";
import {MaterialLogsManager} from "../components/MaterialLogsManager/MaterialLogsManager";
import {GachaData} from "../../Gacha/components/GachaData";
import {useMaterialWithLogsFromRouter} from "../hooks/useMaterialWithLogsFromRouter";
import {HistoryData} from "../components/HistoryData/HistoryData";
import {LoadingComponent} from "../../../component/UI Components/Loading Icons/LoadingComponent";


export function MaterialInfoPageContent() {
    // Get the logs
    const material = useMaterialWithLogsFromRouter();
    if (material === undefined) return <LoadingComponent subtext={"Preparing logs data..."}/>

    return <Container>
        <PageTitle title={material.name + " history"}></PageTitle>

        <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
            <MaterialLogsManager/>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
            <HistoryData/>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
            <GachaData/>
        </ErrorBoundary>
    </Container>
}