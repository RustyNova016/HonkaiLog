import {CenteredDiv} from "../Layout/CenteredDiv";
import ContentDiv from "../Layout/ContentDiv";
import styles from "./CSS/LoadingComponent.module.scss";
import {Grid} from 'react-loading-icons'

export interface LoadingComponentProps {
    height?: string;
}

export function LoadingComponent(props: LoadingComponentProps) {
    return <>
        <Grid height={props.height || "3em"} width={"auto"} fill={"#26C9DDFF"} speed={.75} className={styles.LoadingIcon}/><br/>
        <p style={{textAlign: "center", color: "white"}}>Loading...</p>
    </>;
}

export function PageLoadingComponent() {
    return <CenteredDiv>
        <ContentDiv sides={true} className={styles.flexboxCentered}>
            <LoadingComponent/>
        </ContentDiv>
    </CenteredDiv>;
}