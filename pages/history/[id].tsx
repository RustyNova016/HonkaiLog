import {useSession} from "next-auth/react";
import {GenericPageLayout} from "../../component/pageComponents/GenericPageLayout";
import {Navigation} from "../../component/pageComponents/header/Navigation";
import {useRouter} from "next/router";
import {useMaterialLogs} from "../../tools/Database/Data Hooks/useMaterialLogs";
import {Container} from "react-bootstrap";
import {PageTitle} from "../../component/pageComponents/Theme/Theme";
import {DataCharts} from "../../component/History/dataCharts";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback, ErrorHandler} from "../../component/App Components/ErrorFallback";
import ContentDiv from "../../component/pageComponents/ContentDiv";
import {LoadingComponent} from "../../component/App Components/LoadingComponent";


export default function MatHistoryIdPageContainer() {
    const session = useSession();
    const router = useRouter()

    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        }
    }

    let id = router.query.id;
    if (typeof id !== "string") {
        id = "1";
    }

    return <>
        <GenericPageLayout pushFooter={false}>
            <Navigation/>
            <MatHistoryDataLayer MaterialID={parseInt(id)}/>
        </GenericPageLayout>
    </>
}

export interface MatHistoryIdPageProps {
    MaterialID: number;
}


export function MatHistoryDataLayer(props: MatHistoryIdPageProps) {
    const {isError, isLoading, materialLogs} = useMaterialLogs(props.MaterialID);

    if (isLoading || materialLogs === undefined) {
        return <LoadingComponent/>;
    }

    if (isError) {
        return <div>Error!</div>;
    }

    return <>

        <Container>
            <PageTitle title={materialLogs.name + " history"}></PageTitle>

            <ContentDiv sides={true}>
                <p>You have {}</p>
            </ContentDiv>

            <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                <DataCharts materialLogs={materialLogs}/>
            </ErrorBoundary>

        </Container>
    </>
}