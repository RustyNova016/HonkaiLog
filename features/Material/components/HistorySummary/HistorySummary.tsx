import {TimeframeContextProvider} from "../../../../context/TimeframeContext";
import {MaterialLogsAnalytics} from "./MaterialLogsAnalytics";

export function HistorySummary() {
    return <TimeframeContextProvider>
        <MaterialLogsAnalytics></MaterialLogsAnalytics>
    </TimeframeContextProvider>
}