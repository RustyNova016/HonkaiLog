import {useContext, useId, useState} from "react";
import {TimeframeContext} from "../../../context/TimeframeContext";
import {timeframeSelectOptions} from "../../../data/TimeframeSelectOptions";
import {removeDaysFromToday} from "../../../tools/Miscs";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {PropsWithClass, PropsWithStyle} from "../../../tools/Types";

export interface TimeframeSelectionProps extends PropsWithStyle, PropsWithClass {
    size?: 'sm' | 'lg'
}

/** A dropdown button to select a timeframe */
export function TimeframeDropdown(props: TimeframeSelectionProps) {
    const timeframeContext = useContext(TimeframeContext);
    const [buttonTitle, setButtonTitle] = useState("Select a number of days");
    const id = useId();

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
        <DropdownButton id={id} title={buttonTitle} menuVariant={"dark"} {...props}>
            {buttonOptions}
        </DropdownButton>
    </>
}