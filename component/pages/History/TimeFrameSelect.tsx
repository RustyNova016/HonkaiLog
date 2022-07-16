import {Dispatch, SetStateAction, useContext, useState} from "react";
import {Button, ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";
import {removeDaysFromToday} from "../../../tools/Miscs";
import {useMaterialFromContext} from "../../../features/Material/hooks/useMaterialFromContext";
import {LoadingComponent} from "../../App Components/PageLoadingComponent";
import {TimeframeContext} from "../../../context/TimeframeContext";
import {timeframeSelectOptions} from "../../../data/TimeframeSelectOptions";

export function TimeFrameSelectButton(props: { dayValue: number | null, label: string, action: Dispatch<SetStateAction<Date>> }) {
    // Get the material
    const material = useMaterialFromContext(true);
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    const onClick = function (event: any) {
        if (props.dayValue !== null) {
            return props.action(removeDaysFromToday(props.dayValue))
        } else {
            if (material === undefined || !material.logs.loaded) throw new Error("This shouldn't happen. Material isn't initialized");
            return props.action(new Date(material.logs.getOldestLog().log_date))
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

export function TimeframeSelection() {
    const timeframeContext = useContext(TimeframeContext);
    const [buttonTitle, setButtonTitle] = useState("Select a timeframe");

    const buttonOptions = []
    for (const timeframeSelectOption of timeframeSelectOptions) {
        const OnClick = () => {
            setButtonTitle(timeframeSelectOption.name + " ago")
            timeframeContext.setStartDate(removeDaysFromToday(timeframeSelectOption.nbDays))
            return true
        }

        buttonOptions.push(<Dropdown.Item onClick={OnClick}>{timeframeSelectOption.name + " ago"}</Dropdown.Item>)
    }

    return <>
        <DropdownButton id="dropdown-basic-button" title={buttonTitle}>
            {buttonOptions}
        </DropdownButton>
    </>
}