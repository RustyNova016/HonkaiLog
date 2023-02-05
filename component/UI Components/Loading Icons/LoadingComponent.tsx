"use client";//TODO: Convert Server Component
import {CenteredDiv} from "../../Layout/CenteredDiv";
import {Stack} from "react-bootstrap";
import {PropsWithClass, PropsWithStyle} from "../../../tools/Types";
import {LoadingIcon} from "@/components/UI/Loading/LoadingIcon";

export interface LoadingComponentProps extends PropsWithClass, PropsWithStyle {
    height?: string;
    subtext?: string;
}

export function LoadingComponent(props: LoadingComponentProps) {
    // TODO: Optimize performance of the icon. This shouldn't use that much of GPU
    return <CenteredDiv>
        <Stack>
            <LoadingIcon height={props.height} {...props} />

            <p style={{textAlign: "center", color: "white"}}>Loading...</p>

            {props.subtext ? <p style={{textAlign: "center", color: "white"}}>{props.subtext}</p> : null}
        </Stack>
    </CenteredDiv>;
}