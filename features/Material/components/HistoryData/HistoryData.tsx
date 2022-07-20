import {TimeframeContextProvider} from "../../../../context/TimeframeContext";
import {HistoryDataContent} from "./HistoryDataContent";

export function HistoryData() {
    return <TimeframeContextProvider>
        <HistoryDataContent></HistoryDataContent>
    </TimeframeContextProvider>
}