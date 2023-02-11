import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";
import dayjs from "dayjs";

export interface GraphPoint {
    comment: string,
    dateString: string,
    material: string
    x: Date,
    y: number,
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
            let comment = "";

            if (log.comment !== null) {
                comment = "</br>" + log.comment
            }

            if (log.quantityChange !== null) {
                comment = comment + ` (${log.quantityChange})`
            }

            output.push(
                {
                    x: log.atTime,
                    y: log.quantityTotal,
                    dateString: `${log.atTime.toLocaleDateString()} ${log.atTime.toLocaleTimeString()}`,
                    comment: comment,
                    material: this.calculator.material.toString(log.quantityTotal > 0, true)
                })
        }

        if (output.length > 1) {
            const newestLogOrThrow = this.calculator.logCollection.getNewestLogOrThrow();
            const y = newestLogOrThrow.quantityTotal;
            output.push({
                x: dayjs().toDate(),
                y: y,
                dateString: `${dayjs().toDate().toLocaleDateString()} ${dayjs().toDate().toLocaleTimeString()}`,
                comment: "Supposed quantity at this time",
                material: this.calculator.material.toString(newestLogOrThrow.quantityTotal > 0, true)
            })
        }

        return output
    }
}