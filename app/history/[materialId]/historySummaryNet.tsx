import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import {MaterialLogCollection} from "@/utils/Objects/MaterialLogCollection";

export function HistorySummaryNet({material, logs}: { material: MaterialWithUserData, logs: MaterialLogCollection }) {
    const netGain = logs.calcNetGain();
    const netLoss = logs.calcNetLoss();
    const netDelta = logs.calcNetDelta();

    return <div>
        <h5>Net:</h5>
        <div>
            <p>
                <i className={"bi bi-plus-square px-2"} style={{color: "var(--bs-success)"}}/>
                You gained {netGain} {material.getName(netGain > 1)}
            </p>
            <p>
                <i className={"bi bi-dash-square px-2"} style={{color: "var(--bs-danger)"}}/>
                You spent {netLoss} {material.getName(netLoss > 1)}
            </p>
            <p>
                {
                    netDelta < 0 ?
                        <>
                            <i className={"bi bi-graph-down-arrow px-2"} style={{color: "var(--bs-danger)"}}/>
                            <>Overall, you spent {netDelta} {material.getName(netDelta > 1)}</>
                        </> :
                        netDelta === 0 ?
                            <>
                                <i className={"bi bi-three-dots px-2"} style={{color: "var(--bs-warning)"}}/>
                                <>Overall, you gained 0 {material.getName()}</>
                            </>
                            :
                            <>
                                <i className={"bi bi-graph-up-arrow px-2"} style={{color: "var(--bs-success)"}}/>
                                <>Overall, you gained {netDelta} {material.getName(netDelta > 1)}</>
                            </>
                }
            </p>
        </div>
    </div>;
}