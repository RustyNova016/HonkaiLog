import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import {MaterialLogCollection, Period} from "@/utils/Objects/MaterialLogCollection";

export interface GraphPoint {
    x: Date,
    y: number
}

export class MaterialGrapher {
    constructor(material: MaterialLogCollection) {
        this.logs = material;
    }
    logs: MaterialLogCollection

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