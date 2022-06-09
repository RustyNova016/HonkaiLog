import {Dispatch, SetStateAction, useState} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {getChartData} from "../../tools/Charts/ChartTools";
import {IMaterialLogs} from "../../pages/api/material/count/[id]";
import {removeDaysFromToday} from "../../tools/miscs";
import {PageTitle} from "../pageComponents/Theme/Theme";
import ContentDiv from "../pageComponents/ContentDiv";
import {MaterialHistoryGraph} from "./materialHistoryGraph";

export function TimestampButton(props: { dayValue: number, label: string, action: Dispatch<SetStateAction<Date>> }) {
    return <Button onClick={event => props.action(removeDaysFromToday(props.dayValue))}>{props.label}</Button>;
}

export function DataCharts(props: { materialLogs: IMaterialLogs }) {
    const [lowerDate, setLowerDate] = useState(removeDaysFromToday(1));
    const [upperDate, setUpperDate] = useState(new Date());


    return <ContentDiv sides={true}>
        <PageTitle title={"Data Charts"}></PageTitle>
        <ButtonGroup className="mb-2">
            <TimestampButton dayValue={1} label={"1 day"} action={setLowerDate}/>
            <TimestampButton dayValue={7} label={"7 days"} action={setLowerDate}/>
            <TimestampButton dayValue={30} label={"30 days"} action={setLowerDate}/>
            <TimestampButton dayValue={90} label={"90 days"} action={setLowerDate}/>
            <TimestampButton dayValue={180} label={"180 days"} action={setLowerDate}/>
            <TimestampButton dayValue={365} label={"365 days"} action={setLowerDate}/>
        </ButtonGroup>

        <p>Showing count from the {lowerDate.toLocaleString()} to {upperDate.toLocaleString()}</p>

        <div style={{height: "75vh"}}>
            <MaterialHistoryGraph
                material={props.materialLogs}
                series={getChartData(props.materialLogs, lowerDate)}/>
        </div>
    </ContentDiv>;
}