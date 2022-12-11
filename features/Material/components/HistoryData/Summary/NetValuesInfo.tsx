"use client";
import {UlWithIcon} from "../../../../../component/Text/UlWithIcon";
import {LiWithIcon} from "../../../../../component/Text/LiWithIconProps";
import {LogsProp} from "./HistoryDataSummary";

/** Show the computed net values to the user */
export function NetValuesInfo({logs}: LogsProp) {
    return <>
        <h5>Net values:</h5>

        <UlWithIcon>
            <LiWithIcon iconClass={"bi bi-plus-square"} style={{color: 'var(--bs-success)'}}>
                You gained {logs.calcNetGain()} {logs.material.name}
            </LiWithIcon>

            <LiWithIcon iconClass={"bi bi-dash-square"} style={{color: 'var(--bs-danger)'}}>You
                spent {logs.calcNetLoss()} {logs.material.name}
            </LiWithIcon>

            <DeltaNetValue logs={logs}/>
        </UlWithIcon>
    </>
}

function DeltaNetValue({logs}: LogsProp) {
    const difference = logs.calcNetDelta();

    if (difference < 0) {
        return <LiWithIcon iconClass={"bi bi-graph-down-arrow"} style={{color: "var(--bs-danger)"}}>
            Overall, you spent {difference} {logs.material.name}
        </LiWithIcon>
    } else if (difference === 0) {
        return <LiWithIcon iconClass={"bi bi-three-dots"} style={{color: "var(--bs-warning)"}}>
            Overall, you gained 0 {logs.material.name}
        </LiWithIcon>
    } else {
        return <LiWithIcon iconClass={"bi bi-graph-up-arrow"} style={{color: "var(--bs-success)"}}>
            Overall, you gained {difference} {logs.material.name}
        </LiWithIcon>
    }
}