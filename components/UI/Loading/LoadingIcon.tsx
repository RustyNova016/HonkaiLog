import {Grid} from "react-loading-icons";
import styles from "./LoadingComponent.module.scss";
import {CenterContent} from "@/components/Layouts/CenterContent";

export function LoadingIcon(props: { height?: string }) {
    return <Grid height={props.height || "3em"}
                 width={"auto"} fill={"#26C9DDFF"}
                 speed={.75}
                 className={styles.LoadingIcon} {...props}/>;
}

export function CenteredLoadingIcon() {
    return <CenterContent><LoadingIcon></LoadingIcon></CenterContent>;
}