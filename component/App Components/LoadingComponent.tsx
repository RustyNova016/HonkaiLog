import {CenteredDiv} from "../Layout/CenteredDiv";
import ContentDiv from "../Layout/ContentDiv";
import styles from "./CSS/LoadingComponent.module.scss";
import {Grid} from 'react-loading-icons'

export function LoadingComponent() {
    return <CenteredDiv>
        <ContentDiv sides={true} className={styles.flexboxCentered}>
            <Grid height={"3em"} width={"auto"} fill={"#26C9DDFF"} speed={.75} className={styles.LoadingIcon}/><br/>
            <p style={{textAlign: "center"}}>Loading...</p>
        </ContentDiv>
    </CenteredDiv>;
}