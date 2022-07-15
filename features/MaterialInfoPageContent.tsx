import {useMaterialFromContext} from "./Material/hooks/useMaterialFromContext";
import {LoadingComponent} from "../component/App Components/PageLoadingComponent";
import {Container} from "react-bootstrap";
import {PageTitle} from "../component/pageComponents/Theme/Theme";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback, ErrorHandler} from "../component/App Components/ErrorFallback";
import {MaterialLogsManager} from "./Material/components/MaterialLogsManager/MaterialLogsManager";
import {MaterialLogsAnalytics} from "./Material/components/MaterialLogsAnalytics/MaterialLogsAnalytics";
import {GachaData} from "./Gacha/components/GachaData";


export function MaterialInfoPageContent() {
    // Get the material
    const material = useMaterialFromContext(true);
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    return <Container>
        <PageTitle title={material.name + " history"}></PageTitle>

        <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
            <MaterialLogsManager/>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
            <MaterialLogsAnalytics/>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
            <GachaData/>
        </ErrorBoundary>
    </Container>
}