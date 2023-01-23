import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {MaterialLogCollection} from "@/utils/Objects/Material/MaterialLogCollection";

export function HistorySummaryNet({material, logs}: { material: MaterialHistory, logs: MaterialLogCollection }) {
    const netGain = logs.calcNetGain();
    const netLoss = logs.calcNetLoss();
    const netDelta = logs.calcNetDelta();

    return <div className={"flex flex-col justify-content-center align-items-center"} style={{minWidth: "50%"}}>
        <h3 className={"text-lg-center mb-4"} style={{fontSize: "1.5em"}}><u>Net gains:</u></h3>
        <div style={{width: "fit-content"}}>
            <p style={{width: "fit-content"}}>
                <i className={"bi bi-plus-square px-2"} style={{color: "var(--bs-success)"}}/>
                You gained {netGain} {material.getName(netGain > 1)}
            </p>
            <p style={{width: "fit-content"}}>
                <i className={"bi bi-dash-square px-2"} style={{color: "var(--bs-danger)"}}/>
                You spent {netLoss} {material.getName(netLoss > 1)}
            </p>
            <p style={{width: "fit-content"}}>
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