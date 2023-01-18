import {useContext, useState} from "react";
import {SectionTitle} from "../../../../component/pageComponents/Theme/Theme";
import FramedDiv from "../../../../component/Layout/FramedDiv";
import {TimeframeContext} from "../../../../context/TimeframeContext";
import {Row, Stack} from "react-bootstrap";
import {useMaterialWithLogsFromRouter} from "../../hooks/useMaterialWithLogsFromRouter";
import {HistoryDataSummary} from "./Summary/HistoryDataSummary";
import {TimeframeSelection} from "./TimeframeSelection";
import {MaterialGraphTypes} from "../../../../data/MaterialGraphTypes";
import {HistoryDataGraph} from "./Graph/HistoryDataGraph";
import {GraphTypeSelection} from "./Graph/GraphTypeSelection";
import {LoadingComponent} from "../../../../component/UI Components/Loading Icons/LoadingComponent";


export function HistoryDataContent() {
    // Get the logs
    const material = useMaterialWithLogsFromRouter();
    if (material === undefined) return <LoadingComponent subtext={"Preparing logs data..."}/>

    // Get the timeframe
    const {timeframe} = useContext(TimeframeContext);

    // Log Data
    const logs = material.logCollection.getLogsInTimeframe(timeframe, true)

    // Graph data
    const [materialGraphType, setMaterialGraphType] = useState<MaterialGraphTypes>("quantity");

    return <>
        <FramedDiv sides={true}>
            <Row>
                <Stack direction={"horizontal"}>
                    <SectionTitle title={"History Data"}/>
                    <TimeframeSelection className={"ms-auto"}/>
                </Stack>
            </Row>

            <Row style={{marginBottom: "2em"}}>
                <HistoryDataSummary logs={logs}/>
            </Row>

            <Row>
                <Row>
                    <Stack direction={"horizontal"}>
                        <SectionTitle title={"Graph"}/>
                        <GraphTypeSelection materialGraphTypeHook={setMaterialGraphType} className={"ms-auto"}/>
                    </Stack>
                </Row>

                <Row>
                    <HistoryDataGraph logs={logs} materialGraphType={materialGraphType}/>
                </Row>
            </Row>
        </FramedDiv>
    </>;
}

