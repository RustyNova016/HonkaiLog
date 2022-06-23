import {Dispatch, SetStateAction} from "react";
import {Form} from "react-bootstrap";
import {GraphType} from "./DataCharts";
import {MaterialLogsGraph} from "../../../tools/MaterialLogsGraph";

export interface SelectGraphTypeProps {
    graphTypeHook: Dispatch<SetStateAction<GraphType>>
    materialLogsGraph: MaterialLogsGraph;
}

export function SelectGraphType(props: SelectGraphTypeProps) {
    return <>
        <Form.Label>Graph type</Form.Label>
        <Form.Select>
            <option onClick={() => {
                props.graphTypeHook("count")
            }}>{props.materialLogsGraph.material.name} count
            </option>
            <option onClick={() => {
                props.graphTypeHook("gains")
            }}>{props.materialLogsGraph.material.name} gains
            </option>
            <option onClick={() => {
                props.graphTypeHook("averages")
            }}>{props.materialLogsGraph.material.name} averages
            </option>
        </Form.Select>
    </>;
}