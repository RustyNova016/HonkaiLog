import {Dispatch, SetStateAction, useId, useState} from "react";
import {MaterialGraphTypes, materialGraphTypes} from "../../../../../data/MaterialGraphTypes";
import _ from "lodash";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {PropsWithClass, PropsWithStyle} from "../../../../../tools/Types";

export type MaterialGraphTypeHook = Dispatch<SetStateAction<MaterialGraphTypes>>;

export interface GraphTypeDropdownProps extends PropsWithClass, PropsWithStyle {
    materialGraphTypeHook: MaterialGraphTypeHook
    size?: 'sm' | 'lg',
}

/** A dropdown button to select the graph type */
export function GraphTypeDropdown(props: GraphTypeDropdownProps) {
    const id = useId();
    const [buttonTitle, setButtonTitle] = useState("Select a type");

    const buttonOptions = []
    for (const materialGraphType of materialGraphTypes) {
        const OnClick = () => {
            setButtonTitle(_.capitalize(materialGraphType))
            props.materialGraphTypeHook(materialGraphType)
            return true
        }

        buttonOptions.push(<Dropdown.Item onClick={OnClick}>{_.capitalize(materialGraphType)}</Dropdown.Item>)
    }

    return <>
        <DropdownButton id={id} title={buttonTitle} menuVariant={"dark"} {...props}>
            {buttonOptions}
        </DropdownButton>
    </>
}