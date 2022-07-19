import {Datum, Serie} from "@nivo/line";
import {toTimestamp} from "./Miscs";
import {DatumConstructor} from "./Types/DatumConstructor";
import {LogDatum} from "./Types/LogDatum";
import {MaterialWithLogs} from "./Models/MaterialWithLogs";
import {MaterialGraphTypes} from "../data/MaterialGraphTypes";
import {MaterialLogCollection} from "./Models/MaterialLogCollection";
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
        const i = new MaterialLogCollection(logs.material, [])

        for (const log of logs.logs) {
            i.addLogs([log])

            output.push({
                x: toTimestamp(log.log_date),
                y: _.round(i.calcAvgGain(), 0)
            })
        }
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

    private static generateQuantityGraphData(logs: MaterialLogCollection): Serie {
        return this.createSeries("Quantity", this.calculateQuantityGraphDatum(logs))
    }

    private static generateAverageGraphData(logs: MaterialLogCollection): Serie {
        return this.createSeries("Average", this.calculateAverageGainGraphDatum(logs))
    }
}