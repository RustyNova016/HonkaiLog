import {UserDBResponse} from "../../database/user";
import {MaterialQuantity} from "./MaterialQuantity";
import axios from "axios";
import {APIRoutes} from "../../data/API routes";
import logger from "../Logger";
import {MaterialLogItemJSON} from "../../database/material_log";
import {MaterialWithLogs} from "./MaterialWithLogs";
import {MaterialQuantityWithLogs} from "./MaterialQuantityWithLogs";
import {ITimeframe} from "../../context/TimeframeContext";

/** Snapshot of a quantity at a given time */
export class MaterialLog extends MaterialQuantityWithLogs {
    id: number;
    log_date: Date;
    userId: UserDBResponse["id"];

    constructor(material: MaterialWithLogs, quantity: number, id: number, log_date: Date, userId: UserDBResponse["id"]) {
        super(material, quantity);
        this.id = id;
        this.log_date = log_date;
        this.userId = userId;
    }

    /** Create a MaterialLog instance from a json object */
    static fromJSON(jsonLog: MaterialLogItemJSON, material: MaterialWithLogs): MaterialLog {
        return new MaterialLog(material, jsonLog.count, jsonLog.id, new Date(jsonLog.log_date), jsonLog.userId);
    }

    /** Create a log and save it to the database */
    static async makeLog(quantity: MaterialQuantity) {
        const res = await axios.post(APIRoutes.materialLogs, {
            count: quantity.quantity,
            MaterialId: quantity.material.id
        })

        logger.info("Done sending!", "Material Log")

        // TODO: check for errors
    }

    /** Return the difference of the quantity of material between two logs sorted in chronological order*/
    public getChronologicalDifference(log: MaterialLog): number {
        if (this.isOlderThan(log)) {
            return log.quantity - this.quantity;
        } else {
            return this.quantity - log.quantity;
        }
    }

    /** Return the difference of the quantity of material between two logs */
    public getQuantityDifference(log: MaterialLog): number {
        return this.quantity - log.quantity;
    }

    /** Return true if the log was made during that timeframe */
    public inTimeframe(timeframe: ITimeframe) {
        const afterStart = new Date(this.log_date) >= timeframe.start;
        const beforeEnd = new Date(this.log_date) <= timeframe.end;
        return afterStart && beforeEnd;
    }

    /** Return true if the log is older than the log compared against*/
    public isOlderThan(log: MaterialLog): boolean {
        return this.log_date.getTime() < log.log_date.getTime();
    }
}

