import {PointTooltipProps} from "@nivo/line";
import ContentDiv from "../../Layout/ContentDiv";
import {useContext} from "react";
import {PageLoadingComponent} from "../../App Components/PageLoadingComponent";
import {HistoryContext} from "../../pages/History/MaterialHistoryIDData";

export function MaterialLogPointToolTip(props: PointTooltipProps) {
    const history = useContext(HistoryContext);
    const date = new Date(props.point.data.x);

    if (history === undefined) {
        return <PageLoadingComponent/>
    }

    return (
        <>
            <ContentDiv sides={true}>
                <p>
                    <>Count: {props.point.data.y} {history.name} <br/> {date.toLocaleString()}</>
                </p>
            </ContentDiv>
        </>
    )
}