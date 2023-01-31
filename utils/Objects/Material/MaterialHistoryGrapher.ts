import {MaterialLogCollection} from "@/utils/Objects/Material/MaterialLogCollection";

export interface GraphPoint {
    x: Date,
    y: number
}

export class MaterialHistoryGrapher {
    private logs: MaterialLogCollection

    constructor(logs: MaterialLogCollection) {
        if (logs.isEmpty()) {throw new Error("Log Collection cannot be empty")}
        this.logs = logs;
    }

    /** Generate the graph of the quantity of logs over time
     *
     */
    public generateQuantityGraph(): GraphPoint[] {
        const output: GraphPoint[] = [];

        for (const log of this.logs.logs) {
            output.push({x: log.log_date, y: log.quantity})
        }

        return output
    }
}