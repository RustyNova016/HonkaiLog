import {useSession} from "next-auth/react";
import {GenericPageLayout} from "../../component/pageComponents/GenericPageLayout";
import {Navigation} from "../../component/pageComponents/header/Navigation";
import {useRouter} from "next/router";
import {useMaterialLogs} from "../../tools/Database/Data Hooks/useMaterialLogs";
import {Container, Spinner} from "react-bootstrap";
import {PageTitle} from "../../component/pageComponents/Theme/Theme";
import {DataCharts} from "../../component/History/dataCharts";

export default function MatHistoryId() {
    const session = useSession();
    const router = useRouter()

    let id = router.query.id;
    if (typeof id !== "string") {
        id = "1";
    }

    const {isError, isLoading, materialLogs} = useMaterialLogs(parseInt(id));

    console.log({isError, isLoading, materialLogs})

    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        }
    }
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

                <DataCharts materialLogs={materialLogs}/>
            </Container>
        </GenericPageLayout>
    </>
}

