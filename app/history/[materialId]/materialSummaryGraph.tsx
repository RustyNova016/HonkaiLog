import {CanvasJSWithSSR} from "@/lib/CanvasJS/CanvasJSWithSSR";
import {MaterialHistoryGrapher} from "@/utils/entities/Material/MaterialHistoryGrapher";
import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";

export interface MaterialSummaryGraphProps {
    historyCalculator: MaterialHistoryCalculator;
}

export function MaterialSummaryGraph({historyCalculator}: MaterialSummaryGraphProps) {
    const dataPoints = new MaterialHistoryGrapher(historyCalculator).generateQuantityGraph();
    if (dataPoints.length <= 1) {
        return <>Create a new log or change the time period to get your data </>
    }

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2",
        axisY: {
            title: historyCalculator.material.toString() + " quantity",
            includeZero: false
        },
        axisX: {
            title: "date",
            prefix: "",
            interval: 2
        },
        data: [{
            type: "line",
            toolTipContent: "{dateString}: {y} {material}{comment}",
            dataPoints: dataPoints
        }]
    }

    return (
        <div>
            <CanvasJSWithSSR options={options}/>
        </div>
    );
}