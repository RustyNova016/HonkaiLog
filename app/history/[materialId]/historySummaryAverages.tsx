import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import _ from "lodash";
import {MaterialLogCollection} from "@/utils/Objects/MaterialLogCollection";

export function HistorySummaryAverages({
                                           material,
                                           logs
                                       }: { material: MaterialWithUserData, logs: MaterialLogCollection }) {
    const avgGain = _.round(logs.calcAvgGainUntilToday(), 2);
    const avgLoss = _.round(logs.calcAvgLoss(), 2);
    const avgDelta = _.round(logs.calcAvgDelta(), 2);

    return <div>
        <h5>Averages:</h5>
        <div>
            <p>
                <i className={"bi bi-plus-square px-2"} style={{color: 'var(--bs-success)'}}/>
                You gained an average of {avgGain} {material.getName(avgGain > 1)} per day
            </p>
            <p>
                <i className={"bi bi-dash-square px-2"} style={{color: 'var(--bs-danger)'}}/>
                You spent an average of {avgLoss} {material.name} per day
            </p>
            <p>
                {
                    avgDelta < 0 ?
                        <>
                            <i className={"bi bi-graph-down-arrow px-2"} style={{color: "var(--bs-danger)"}}/>
                            <>Overall, you have spent an average of {avgDelta} {material.getName(avgDelta < -1)} per
                                day
                            </>
                        </> : avgDelta == 0 ?
                            <>
                                <i className={"bi bi-three-dots px-2"} style={{color: "var(--bs-warning)"}}/>
                                <>Overall, you gain an average of {avgDelta} {material.getName()} per day</>
                            </> :
                            <>
                                <i className={"bi bi-graph-up-arrow px-2"} style={{color: "var(--bs-success)"}}/>
                                <>Overall, you gain an average of {avgDelta} {material.getName(avgDelta > 1)} per day</>
                            </>
                }
            </p>
        </div>
    </div>
}