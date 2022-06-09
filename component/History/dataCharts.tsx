import {Dispatch, SetStateAction, useContext, useState} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {removeDaysFromToday} from "../../tools/miscs";
import {PageTitle} from "../pageComponents/Theme/Theme";
import ContentDiv from "../pageComponents/ContentDiv";
import {MaterialHistoryGraph} from "./MaterialHistoryGraph";
import {IMaterialCountAPIResponse} from "../../pages/api/material/count/[id]";
import {HistoryContext} from "../../pages/history/[id]";
import {LoadingComponent} from "../App Components/LoadingComponent";

export function TimestampButton(props: { dayValue: number | null, label: string, action: Dispatch<SetStateAction<Date>> }) {
    const history = useContext(HistoryContext);

    if (history === undefined) {
        return <LoadingComponent/>
    }

    return <Button onClick={
        event => {
            if (props.dayValue !== null) {
                return props.action(removeDaysFromToday(props.dayValue))
            } else {
                return props.action(new Date(history.getOldestLog().log_date))
            }
        }
    }>{props.label}</Button>;
}

export interface DataChartsProps {
    materialLogs: IMaterialCountAPIResponse;
}

export function DataCharts(props: DataChartsProps) {
    const [lowerDate, setLowerDate] = useState<Date>(removeDaysFromToday(1));
    const [upperDate, setUpperDate] = useState(new Date());
    const history = useContext(HistoryContext);

    if (history === undefined) {
        return <LoadingComponent/>
    }

    // TODO: All time option

    // TODO: Tell when there's 1, or lower, points


    return <ContentDiv sides={true}>
        <PageTitle title={"Data Charts"}></PageTitle>
        <ButtonGroup className="mb-2">
            <TimestampButton dayValue={1} label={"1 day"} action={setLowerDate}/>
            <TimestampButton dayValue={7} label={"7 days"} action={setLowerDate}/>
            <TimestampButton dayValue={30} label={"30 days"} action={setLowerDate}/>
            <TimestampButton dayValue={90} label={"90 days"} action={setLowerDate}/>
            <TimestampButton dayValue={180} label={"180 days"} action={setLowerDate}/>
            <TimestampButton dayValue={365} label={"365 days"} action={setLowerDate}/>
            <TimestampButton dayValue={null} label={"All Time"} action={setLowerDate}/>
        </ButtonGroup>

        <p>Showing count from the {lowerDate.toLocaleString()} to {upperDate.toLocaleString()}</p>

        <div style={{height: "75vh"}}>
            <MaterialHistoryGraph series={history.createChartData(lowerDate)}/>
        </div>
    </ContentDiv>;
}