import {CenteredDiv} from "../Layout/CenteredDiv";
import FramedDiv from "../Layout/FramedDiv";
import styles from "./CSS/LoadingComponent.module.scss";
import {Grid} from 'react-loading-icons'
import {Fade} from "react-awesome-reveal";
import {PropsWithClass, PropsWithStyle} from "../../tools/Types";
import {Stack} from "react-bootstrap";

export interface LoadingComponentProps extends PropsWithClass, PropsWithStyle {
    height?: string;
    subtext?: string;
}

export function LoadingComponent(props: LoadingComponentProps) {
    // TODO: Optimize performance of the icon. This shouldn't use that much of GPU
    return <CenteredDiv>
        <Stack>
            <Grid height={props.height || "3em"} width={"auto"} fill={"#26C9DDFF"} speed={.75}
                  className={styles.LoadingIcon} {...props}/>

            <p style={{textAlign: "center", color: "white"}}>Loading...</p>

            {props.subtext ? <p style={{textAlign: "center", color: "white"}}>{props.subtext}</p> : null}
        </Stack>
    </CenteredDiv>;
}

export interface PageLoadingComponentProps extends LoadingComponentProps {}

export function PageLoadingComponent(props: PageLoadingComponentProps) {
    return <CenteredDiv>
        <Fade>
            <FramedDiv sides={true} className={styles.flexboxCentered}>
                <LoadingComponent {...props}/>
            </FramedDiv>
        </Fade>
    </CenteredDiv>;
}