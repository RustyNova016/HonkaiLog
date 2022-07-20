import {UlWithIcon} from "../../../../../component/Text/UlWithIcon";
import {LiWithIcon} from "../../../../../component/Text/LiWithIconProps";
import _ from "lodash";
import {LogsProp} from "./HistoryDataSummary";

export function AverageValuesInfo({logs}: LogsProp) {
    return <>
        <h5>Averages:</h5>

        <UlWithIcon>
            <LiWithIcon iconClass={"bi bi-plus-square"} style={{color: 'var(--bs-success)'}}>
                You gained an average of {_.round(logs.calcAvgGainUntilToday(), 2)} {logs.material.name} per day
            </LiWithIcon>

            <LiWithIcon iconClass={"bi bi-dash-square"} style={{color: 'var(--bs-danger)'}}>
                You spent an average of {_.round(logs.calcAvgLoss(), 2)} {logs.material.name} per day
            </LiWithIcon>

            <DeltaAverageValue logs={logs}/>
        </UlWithIcon>
    </>
}

function DeltaAverageValue({logs}: LogsProp) {
    const difference = _.round(logs.calcAvgDelta(), 2);

    if (difference < 0) {
        return <LiWithIcon iconClass={"bi bi-graph-down-arrow"} style={{color: "var(--bs-danger)"}}>
            Overall, you spent an average of {difference} {logs.material.name} per day
        </LiWithIcon>
    } else if (difference === 0) {
        return <LiWithIcon iconClass={"bi bi-three-dots"} style={{color: "var(--bs-warning)"}}>
            Overall, you gain an average of {logs.material.name} per day
        </LiWithIcon>
    } else {
        return <LiWithIcon iconClass={"bi bi-graph-up-arrow"} style={{color: "var(--bs-success)"}}>
            Overall, you gain an average of {difference} {logs.material.name} per day
        </LiWithIcon>
    }
}