import {MaterialHistory} from "../../../tools/Database/MaterialHistory";
import {Dispatch, SetStateAction} from "react";
import {Form} from "react-bootstrap";
import {GraphType} from "./DataCharts";

export interface SelectGraphTypeProps {
    history: MaterialHistory;
    graphTypeHook: Dispatch<SetStateAction<GraphType>>
}

export function SelectGraphType(props: SelectGraphTypeProps) {
    return <>
        <Form.Label>Graph type</Form.Label>
        <Form.Select>
            <option onClick={() => {
                props.graphTypeHook("count")
            }}>{props.history.name} count
            </option>
            <option onClick={() => {
                props.graphTypeHook("gains")
            }}>{props.history.name} gains
            </option>
        </Form.Select>
    </>;
}