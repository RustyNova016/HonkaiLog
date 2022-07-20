import {Stack} from "react-bootstrap";
import {GraphTypeDropdown, MaterialGraphTypeHook} from "./GraphTypeDropdown";
import {PropsWithClass, PropsWithStyle} from "../../../../../tools/Types";

export interface GraphTypeSelectionProps extends PropsWithClass, PropsWithStyle {
    materialGraphTypeHook: MaterialGraphTypeHook
}

export function GraphTypeSelection(props: GraphTypeSelectionProps) {
    return <Stack direction={"horizontal"} {...props}>
        <p>Showing graph type: </p>
        <GraphTypeDropdown materialGraphTypeHook={props.materialGraphTypeHook} size={"lg"}/>
    </Stack>;
}