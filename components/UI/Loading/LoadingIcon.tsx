import {Grid} from "react-loading-icons";
import styles from "./LoadingComponent.module.scss";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {CenteredDiv} from "../../../component/Layout/CenteredDiv";
import {Stack} from "react-bootstrap";
import {PropsWithClass, PropsWithStyle} from "../../../tools/Types";

export function LoadingIcon(props: { height?: string }) {
    return <Grid height={props.height || "3em"}
                 width={"auto"} fill={"#26C9DDFF"}
                 speed={1}
                 className={styles["LoadingIcon"]} {...props}/>;
}

export function CenteredLoadingIcon() {
    return <CenterContent><LoadingIcon></LoadingIcon></CenterContent>;
}

export interface LoadingComponentProps extends PropsWithClass, PropsWithStyle {
    height?: string;
    subtext?: string;
}

export function LoadingIconWithText(props: LoadingComponentProps) {
    // TODO: Optimize performance of the icon. This shouldn't use that much of GPU
    return <CenteredDiv>
            <LoadingIcon/>

            <p style={{textAlign: "center", color: "white"}}>Loading...</p>

            {props.subtext ? <p style={{textAlign: "center", color: "white"}}>{props.subtext}</p> : null}
    </CenteredDiv>;
}