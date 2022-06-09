import {useSession} from "next-auth/react";
import {GenericPageLayout} from "../../component/pageComponents/GenericPageLayout";
import {Navigation} from "../../component/pageComponents/header/Navigation";
import {useRouter} from "next/router";
import {useMaterialLogs} from "../../tools/Database/Data Hooks/useMaterialLogs";
import {Container, Spinner} from "react-bootstrap";
import {PageTitle} from "../../component/pageComponents/Theme/Theme";
import {DataCharts} from "../../component/History/dataCharts";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback, ErrorHandler} from "../../component/App Components/ErrorFallback";

export default function MatHistoryId() {
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


    let id1 = parseInt(id);
    const {isError, isLoading, materialLogs} = useMaterialLogs(id1);

    console.log({isError, isLoading, materialLogs})


    if (isLoading) {
        return <div><Spinner animation="border"/>Loading...</div>;
    }

    if (isError) {
        return <div>Error!</div>;
    }

    if (materialLogs === undefined) {
        return <div>No logs?</div>;
    }

    return <>
        <GenericPageLayout pushFooter={false}>
            <Navigation/>
            <Container>
                <PageTitle title={materialLogs.name + " history"}></PageTitle>

                <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                    <DataCharts materialLogs={materialLogs}/>
                </ErrorBoundary>

            </Container>
        </GenericPageLayout>
    </>
}

