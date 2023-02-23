import _ from "lodash";
import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";

interface HistorySummaryAveragesProps {
    calculator: MaterialHistoryCalculator;
}

export function HistorySummaryAverages({calculator}: HistorySummaryAveragesProps) {
    const material = calculator.materialHistory.material
    const avgGain = _.round(calculator.calcAvgGain(), 2);
    const avgLoss = _.round(calculator.calcAvgLoss(), 2);
    const avgDelta = _.round(calculator.calcAvgDelta(), 2);

    return <div className={"flex flex-col justify-content-center align-items-center"} style={{minWidth: "50%"}}>
        <h3></h3>
        <h3 className={"text-lg-center mb-4"} style={{fontSize: "1.5em"}}>
            <u>Average gains:</u>
        </h3>
        <div>
            <p style={{width: "fit-content"}}>
                <i className={"bi bi-plus-square px-2"} style={{color: 'var(--bs-success)'}}/>
                You gained an average of {avgGain} {material.toString(avgGain > 1)} per day
            </p>
            <p style={{width: "fit-content"}}>
                <i className={"bi bi-dash-square px-2"} style={{color: 'var(--bs-danger)'}}/>
                You spent an average of {avgLoss} {material.name} per day
            </p>
            <p style={{width: "fit-content"}}>
                {
                    avgDelta < 0 ?
                        <>
                            <i className={"bi bi-graph-down-arrow px-2"} style={{color: "var(--bs-danger)"}}/>
                            <>Overall, you have spent an average of {avgDelta} {material.toString(avgDelta < -1)} per
                                day
                            </>
                        </> : avgDelta == 0 ?
                            <>
                                <i className={"bi bi-three-dots px-2"} style={{color: "var(--bs-warning)"}}/>
                                <>Overall, you gain an average of {avgDelta} {material.toString()} per day</>
                            </> :
                            <>
                                <i className={"bi bi-graph-up-arrow px-2"} style={{color: "var(--bs-success)"}}/>
                                <>Overall, you gain an average of {avgDelta} {material.toString(avgDelta > 1)} per day</>
                            </>
                }
            </p>
        </div>
    </div>
}