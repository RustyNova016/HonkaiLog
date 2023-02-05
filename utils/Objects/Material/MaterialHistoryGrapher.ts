import {MaterialHistoryCalculator} from "@/utils/Objects/Material/MaterialHistoryCalculator";
import dayjs from "dayjs";

export interface GraphPoint {
    x: Date,
    y: number
}

export class MaterialHistoryGrapher {
    private calculator: MaterialHistoryCalculator;

    constructor(calculator: MaterialHistoryCalculator) {
        console.log()
        this.calculator = calculator.addLinearSplit().filterToPeriod();
    }

    /** Generate the graph of the quantity of logs over time
     *
     */
    public generateQuantityGraph(): GraphPoint[] {
        const output: GraphPoint[] = [];

        for (const log of this.calculator.logs) {
            output.push({x: log.log_date, y: log.quantity})
        }

        if(output.length > 1){
            output.push({x: dayjs().toDate(), y: this.calculator.logCollection.getNewestLogOrThrow().quantity})
        }

        return output
    }
}