import {CenteredDiv} from "../Layout/CenteredDiv";
import FramedDiv from "../Layout/FramedDiv";
import styles from "./CSS/LoadingComponent.module.scss";
import {Fade} from "react-awesome-reveal";
import {LoadingComponent, LoadingComponentProps} from "../UI Components/Loading Icons/LoadingComponent";

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