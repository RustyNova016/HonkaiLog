import {useSession} from "next-auth/react";
import {GenericPageLayout} from "../../component/pageComponents/GenericPageLayout";
import {Navigation} from "../../component/pageComponents/header/Navigation";
import {useRouter} from "next/router";
import {useMaterialLogs} from "../../tools/Database/Data Hooks/useMaterialLogs";
import {MaterialHistoryGraph} from "../../component/History/materialHistoryGraph";
import ContentDiv from "../../component/pageComponents/ContentDiv";
import {Button, ButtonGroup, Container, Spinner} from "react-bootstrap";
import {PageTitle} from "../../component/pageComponents/Theme/Theme";
import {useState} from "react";
import {getChartData} from "../../tools/Charts/ChartTools";

export default function MatHistoryId() {
    const session = useSession();
    const router = useRouter()
    const [daysBack, setDaysBack] = useState(1);


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

    function getDateFrom() {
        const date = new Date();
        date.setDate(date.getDate() - daysBack);
        return date;
    }

    //const dateLowerBound = props.dateFrom || new Date(props.logs.Material_logs[0].log_date);
    //const dateUpperBound = props.dateTo || new Date(props.logs.Material_logs[props.logs.Material_logs.length - 1].log_date);

    return <>
        <GenericPageLayout pushFooter={false}>
            <Navigation/>
            <Container>
                <PageTitle title={materialLogs.name + " history"}></PageTitle>

                <ContentDiv>
                    <ButtonGroup className="mb-2">
                        <Button onClick={event => setDaysBack(1)}>1 Day</Button>
                        <Button onClick={event => setDaysBack(7)}>7 Days</Button>
                        <Button onClick={event => setDaysBack(30)}>30 Days</Button>
                        <Button onClick={event => setDaysBack(90)}>3 Months</Button>
                        <Button onClick={event => setDaysBack(365)}>1 Year</Button>
                    </ButtonGroup>

                    <div style={{height: "75vh"}}>
                        <MaterialHistoryGraph
                            logs={materialLogs}
                            series={getChartData(materialLogs, getDateFrom())}
                            dateFrom={getDateFrom()}/>
                    </div>
                </ContentDiv>
            </Container>
        </GenericPageLayout>
    </>
}

