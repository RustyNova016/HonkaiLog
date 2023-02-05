import {MaterialHistoryCalculator} from "@/utils/Objects/Material/MaterialHistoryCalculator";

interface HistorySummaryNet {
    calculator: MaterialHistoryCalculator
}

export function HistorySummaryNet({calculator}: HistorySummaryNet) {
    const material = calculator.material
    const netGain = calculator.getNetGain();
    const netLoss = calculator.getNetloss();
    const netDelta = calculator.getNetDelta();

    return <div className={"flex flex-col justify-content-center align-items-center"} style={{minWidth: "50%"}}>
        <h3 className={"text-lg-center mb-4"} style={{fontSize: "1.5em"}}><u>Net gains:</u></h3>
        <div style={{width: "fit-content"}}>
            <p style={{width: "fit-content"}}>
                <i className={"bi bi-plus-square px-2"} style={{color: "var(--bs-success)"}}/>
                You gained {netGain} {material.toString(netGain > 1)}
            </p>
            <p style={{width: "fit-content"}}>
                <i className={"bi bi-dash-square px-2"} style={{color: "var(--bs-danger)"}}/>
                You spent {netLoss} {material.toString(netLoss > 1)}
            </p>
            <p style={{width: "fit-content"}}>
                {
                    netDelta < 0 ?
                        <>
                            <i className={"bi bi-graph-down-arrow px-2"} style={{color: "var(--bs-danger)"}}/>
                            <>Overall, you spent {netDelta} {material.toString(netDelta > 1)}</>
                        </> :
                        netDelta === 0 ?
                            <>
                                <i className={"bi bi-three-dots px-2"} style={{color: "var(--bs-warning)"}}/>
                                <>Overall, you gained 0 {material.toString()}</>
                            </>
                            :
                            <>
                                <i className={"bi bi-graph-up-arrow px-2"} style={{color: "var(--bs-success)"}}/>
                                <>Overall, you gained {netDelta} {material.toString(netDelta > 1)}</>
                            </>
                }
            </p>
        </div>
    </div>;
}