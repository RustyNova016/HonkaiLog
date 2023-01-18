import {CanvasJSWithSSR} from "@/lib/CanvasJS/CanvasJSWithSSR";
import {MaterialLogCollection} from "@/utils/Objects/MaterialLogCollection";
import {MaterialGrapher} from "@/utils/Objects/MaterialGrapher";

export function MaterialSummaryGraph({logs}: { logs: MaterialLogCollection }) {

    const dataPoints = new MaterialGrapher(logs).generateQuantityGraph();
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2",
        axisY: {
            title: logs.material.getName() + " quantity",
            includeZero: false
        },
        axisX: {
            title: "date",
            prefix: "",
            interval: 2
        },
        data: [{
            type: "line",
            toolTipContent: "{x}: {y}",
            dataPoints: dataPoints
        }],
        navigator: {
            data: [{
                dataPoints: dataPoints
            }],
            slider: {
                minimum: logs.getOldestLog().log_date,
                maximum: logs.getNewestLog().log_date
            }
        }
    }

    return (
        <div>
            <h1>React Line Chart</h1>
            <CanvasJSWithSSR options={options}/>
        </div>
    );
}