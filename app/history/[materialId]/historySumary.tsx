import _ from "lodash";
import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";

/** Show the summary of the gain and losses of the user */
export function HistorySumary({material}: { material: MaterialWithUserData }) {
    const netGain = material.logCollection.calcNetGain();
    const netLoss = material.logCollection.calcNetLoss();

    return <>
        <div className={"flex flex-row justify-content-evenly"}>
            <div>
                <h5>Net:</h5>
                <div>
                    <p>
                        <i className={"bi bi-plus-square px-2"} style={{color: 'var(--bs-success)'}}/>
                        You gained {netGain} {material.getName(netGain > 1)}
                    </p>
                    <p>
                        <i className={"bi bi-dash-square px-2"} style={{color: 'var(--bs-danger)'}}/>
                        You spent {netLoss} {material.getName(netLoss > 1)}
                    </p>
                    <DeltaNetValue material={material}/>
                </div>
            </div>
            <HistorySumaryAverages material={material}/>
        </div>
    </>;
}

function HistorySumaryAverages({material}: { material: MaterialWithUserData }) {
    const avgGain = _.round(material.logCollection.calcAvgGainUntilToday(), 2);
    const avgLoss = _.round(material.logCollection.calcAvgLoss(), 2);
    const avgDelta = _.round(material.logCollection.calcAvgDelta(), 2);

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

function DeltaNetValue({material}: { material: MaterialWithUserData }) {
    const difference = material.logCollection.calcNetDelta();

    if (difference < 0) {
        return <p><i className={"bi bi-graph-down-arrow px-2"} style={{color: "var(--bs-danger)"}}/>
            Overall, you spent {difference} {material.getName(difference > 1)}
        </p>
    } else if (difference === 0) {
        return <p><i className={"bi bi-three-dots px-2"} style={{color: "var(--bs-warning)"}}/>
            Overall, you gained 0 {material.getName(difference > 1)}
        </p>
    } else {
        return <p><i className={"bi bi-graph-up-arrow px-2"} style={{color: "var(--bs-success)"}}/>
            Overall, you gained {difference} {material.getName(difference > 1)}
        </p>
    }
}