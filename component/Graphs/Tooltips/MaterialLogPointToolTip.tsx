import {PointTooltipProps} from "@nivo/line";
import ContentDiv from "../../Layout/ContentDiv";
import {useContext} from "react";
import {MaterialContext} from "../../Contexts/MaterialContext";

export function MaterialLogPointToolTip(props: PointTooltipProps) {
    // Get the material
    const material = useContext(MaterialContext)

    const date = new Date(props.point.data.x);

    return (
        <>
            <ContentDiv sides={true}>
                <p>
                    <>Count: {props.point.data.y} {material.name} <br/> {date.toLocaleString()}</>
                </p>
            </ContentDiv>
        </>
    )
}