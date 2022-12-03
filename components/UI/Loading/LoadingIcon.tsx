import {Grid} from "react-loading-icons";
import styles from "../../../component/App Components/CSS/LoadingComponent.module.scss";

export function LoadingIcon(props: { height?: string }) {
    return <Grid height={props.height || "3em"}
                 width={"auto"} fill={"#26C9DDFF"}
                 speed={.75}
                 className={styles.LoadingIcon} {...props}/>;
}