import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import {MaterialLogCollection, Period} from "@/utils/Objects/MaterialLogCollection";
import {MaterialHistoryAnalyser} from "@/utils/Objects/MaterialHistoryAnalyser";

export interface GraphPoint {
    x: Date,
    y: number
}

export class MaterialGrapher {
    constructor(logs: MaterialLogCollection) {
        if (logs.isEmpty()) {throw new Error("Log Collection cannot be empty")}
        this.logs = logs;
    }
    private logs: MaterialLogCollection

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