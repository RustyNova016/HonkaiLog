import {NoDataErrorComponent} from "../../../../component/App Components/Errors/NoDataErrorComponent";
import {MaterialLogCollection} from "../../../../tools/Models/MaterialLogCollection";
import {Fade} from "react-awesome-reveal";
import {UlWithIcon} from "../../../../component/Text/UlWithIcon";
import {LiWithIcon} from "../../../../component/Text/LiWithIconProps";
import {MaterialWithLogs} from "../../../../tools/Models/MaterialWithLogs";

export interface MaterialHistorySummaryProps {
    /** Logs of the timeframe to expose */
    logs: MaterialLogCollection
}

export interface OverallDifferenceProps {
    /** Logs of the timeframe to expose */
    logs: MaterialLogCollection
}

export function OverallDifference(props: OverallDifferenceProps) {
    const difference = props.logs.calcDifference();
    const positiveDifference = difference >= 0;

    let icon: string;
    let color: string;
    let verb: string

    if (positiveDifference){
        icon = "bi bi-graph-up-arrow";
        color = "var(--bs-success)";
        verb = "gained";
    } else {
        icon = "bi bi-graph-down-arrow";
        color = "var(--bs-danger)";
        verb = "spent";
    }

    return <LiWithIcon iconClass={icon} style={{color: color}}>
        Overall, you {verb} {difference} {props.logs.material.name}
    </LiWithIcon>;
}

export function MaterialHistorySummary({logs}: MaterialHistorySummaryProps) {
    if (logs.empty()) return <NoDataErrorComponent/>

    return <>
        <Fade>
            <h5>Summary of this period:</h5>

            <UlWithIcon>
                <LiWithIcon iconClass={"bi bi-plus-square"} style={{color: 'var(--bs-success)'}}>
                    You gained {logs.calcGainAmount()} {logs.material.name}
                </LiWithIcon>

                <LiWithIcon iconClass={"bi bi-dash-square"} style={{color: 'var(--bs-danger)'}}>You
                    spent {logs.calcSpentAmount()} {logs.material.name}
                </LiWithIcon>

                <OverallDifference logs={logs}/>
            </UlWithIcon>
        </Fade>
    </>;
}
