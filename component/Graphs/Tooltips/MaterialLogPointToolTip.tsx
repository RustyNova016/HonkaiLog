import {PointTooltipProps} from "@nivo/line";
import FramedDiv from "../../Layout/FramedDiv";
import {useMaterialFromContext} from "../../../features/Material/hooks/useMaterialFromContext";
import {LoadingComponent} from "../../App Components/PageLoadingComponent";

export function MaterialLogPointToolTip(props: PointTooltipProps) {
    // Get the material
    const material = useMaterialFromContext(true);
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    const date = new Date(props.point.data.x);

    return (
        <>
            <FramedDiv sides={true}>
                <p>
                    <>Count: {props.point.data.y} {material.name} <br/> {date.toLocaleString()}</>
                </p>
            </FramedDiv>
        </>
    )
}