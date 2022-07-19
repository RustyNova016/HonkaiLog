import {Stack} from "react-bootstrap";
import {TimeframeDropdown} from "../../../../component/pages/History/TimeframeDropdown";
import {PropsWithClass, PropsWithStyle} from "../../../../tools/Types";

export interface TimeframeSelectionProps extends PropsWithClass, PropsWithStyle {}

export function TimeframeSelection(props: TimeframeSelectionProps) {
    return <Stack direction={"horizontal"} {...props}>
        <p>Using data from </p>
        <TimeframeDropdown size={"lg"}/>
        <p> to today</p>
    </Stack>;
}