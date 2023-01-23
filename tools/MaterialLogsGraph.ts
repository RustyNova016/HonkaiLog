import {Datum, Serie} from "@nivo/line";
import {toTimestamp} from "./Miscs";
import {MaterialGraphTypes} from "../data/MaterialGraphTypes";
import {MaterialLogCollection} from "@/utils/Objects/Material/MaterialLogCollection";
import _ from "lodash";

export interface HistoryLogDatum extends Datum {
    x: number;
    y: number;
}

/** Util class that generate graph data */
export class GraphData {
    protected static createSeries(name: string, data: Datum[]): Serie {
        return {
            id: name,
            data: data
        }
    }
}


/** Util class that generate graph data of a MaterialLogCollection */
export class MaterialHistoryGraphData extends GraphData {
    public static generateMaterialHistoryGraphData(logs: MaterialLogCollection, type: MaterialGraphTypes): Serie {
        switch (type) {
            case "quantity":
                return this.generateQuantityGraphData(logs);

            case "average":
                return this.generateAverageGraphData(logs);
        }
    }

    private static calculateAverageGainGraphDatum(logs: MaterialLogCollection): HistoryLogDatum[] {
        const output: HistoryLogDatum[] = []
        const collection = new MaterialLogCollection(logs.material, [])

        // Todo: Ignore massive spike at the start of the curve
        for (const log of logs.logs) {
            collection.addLogs([log])

            output.push({
                x: toTimestamp(log.log_date),
                y: _.round(collection.calcAvgGain(), 0)
            })
        }

        // Remove the first point since it's always 0
        output.shift()
        return output
    }

    private static calculateQuantityGraphDatum(logs: MaterialLogCollection): HistoryLogDatum[] {
        const output: HistoryLogDatum[] = []

        for (const log of logs.logs) {
            output.push({
                x: toTimestamp(log.log_date),
                y: log.quantity
            })
        }
        return output
    }

    private static generateAverageGraphData(logs: MaterialLogCollection): Serie {
        return this.createSeries("Average", this.calculateAverageGainGraphDatum(logs))
    }

    private static generateQuantityGraphData(logs: MaterialLogCollection): Serie {
        return this.createSeries("Quantity", this.calculateQuantityGraphDatum(logs))
    }
}