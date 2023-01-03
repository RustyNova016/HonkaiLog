import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import _ from "lodash";
import {MaterialLogCollection, Period} from "@/utils/Objects/MaterialLogCollection";

interface HistorySummaryAveragesProps {
    material: MaterialWithUserData;
    logs: MaterialLogCollection;
    period: Period;
}

export function HistorySummaryAverages(props: HistorySummaryAveragesProps) {
    const {material, logs, period} = props
    const avgGain = _.round(logs.calcAvgGain(), 2);
    const avgLoss = _.round(logs.calcAvgLoss(), 2);
    const avgDelta = _.round(logs.calcAvgDelta(), 2);

    return <div className={"flex flex-col justify-content-center align-items-center"} style={{minWidth: "50%"}}>
        <h3></h3>
        <h3 className={"text-lg-center mb-4"} style={{fontSize: "1.5em"}}>
            <u>Average gains:</u>
        </h3>
        <div>
            <p style={{width: "fit-content"}}>
                <i className={"bi bi-plus-square px-2"} style={{color: 'var(--bs-success)'}}/>
                You gained an average of {avgGain} {material.getName(avgGain > 1)} per day
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