import {useContext, useState} from "react";
import {SectionTitle} from "../../../../component/pageComponents/Theme/Theme";
import FramedDiv from "../../../../component/Layout/FramedDiv";
import {LoadingComponent} from "../../../../component/App Components/PageLoadingComponent";
import {TimeframeContext} from "../../../../context/TimeframeContext";
import {Row, Stack} from "react-bootstrap";
import {useMaterialWithLogsFromRouter} from "../../hooks/useMaterialWithLogsFromRouter";
import {HistoryDataSummary} from "./Summary/HistoryDataSummary";
import {TimeframeSelection} from "./TimeframeSelection";
import {MaterialGraphTypes} from "../../../../data/MaterialGraphTypes";
import {HistoryDataGraph} from "./Graph/HistoryDataGraph";
import {GraphTypeSelection} from "./Graph/GraphTypeSelection";


export function HistoryDataContent() {
    // Get the material
    const material = useMaterialWithLogsFromRouter();
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    // Get the timeframe
    const {timeframe} = useContext(TimeframeContext);

    // Log Data
    const logs = material.logs.getLogsInTimeframe(timeframe, true)

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

            <Row>
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

