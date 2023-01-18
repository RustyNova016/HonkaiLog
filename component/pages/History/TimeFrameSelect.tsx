import {Dispatch, SetStateAction} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {removeDaysFromToday} from "../../../tools/Miscs";
import {useMaterialWithLogsFromRouter} from "../../../features/Material/hooks/useMaterialWithLogsFromRouter";
import {LoadingComponent} from "../../UI Components/Loading Icons/LoadingComponent";

export function TimeFrameSelectButton(props: { dayValue: number | null, label: string, action: Dispatch<SetStateAction<Date>> }) {
    // Get the logs
    const material = useMaterialWithLogsFromRouter();
    if (material === undefined) return <LoadingComponent subtext={"Preparing logs data..."}/>

    const onClick = function (event: any) {
        if (props.dayValue !== null) {
            return props.action(removeDaysFromToday(props.dayValue))
        } else {
            return props.action(new Date(material.logCollection.getOldestLog().log_date))
        }
    };

    return <Button onClick={onClick}>{props.label}</Button>;
}

export function TimeFrameSelect(props: { dateHook: (value: (((prevState: Date) => Date) | Date)) => void }) {
    return <>
        <ButtonGroup className="mb-2">
            <TimeFrameSelectButton dayValue={1} label={"1 day"} action={props.dateHook}/>
            <TimeFrameSelectButton dayValue={7} label={"7 days"} action={props.dateHook}/>
            <TimeFrameSelectButton dayValue={30} label={"30 days"} action={props.dateHook}/>
            <TimeFrameSelectButton dayValue={90} label={"90 days"} action={props.dateHook}/>
            <TimeFrameSelectButton dayValue={180} label={"180 days"} action={props.dateHook}/>
            <TimeFrameSelectButton dayValue={365} label={"365 days"} action={props.dateHook}/>
            <TimeFrameSelectButton dayValue={null} label={"All Time"} action={props.dateHook}/>
        </ButtonGroup>;

    </>
}