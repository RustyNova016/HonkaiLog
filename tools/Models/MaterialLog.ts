import {UserDBResponse} from "../../database/user";
import {MaterialQuantity} from "./MaterialQuantity";
import axios from "axios";
import {APIRoutes} from "../../data/API routes";
import logger from "../Logger";
import {MaterialLogItemJSON} from "../../database/material_log";
import {MaterialWithLogs} from "./MaterialWithLogs";
import {MaterialQuantityWithLogs} from "./MaterialQuantityWithLogs";

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

    static async createNewLog(quantity: MaterialQuantity) {
        const res = await axios.post(APIRoutes.materialLogs, {
            count: quantity.quantity,
            MaterialId: quantity.material.id
        })

        logger.info("Done sending!", "Material Log")

        // TODO: check for errors
    }

    static fromJSON(jsonLog: MaterialLogItemJSON, material: MaterialWithLogs): MaterialLog {
        return new MaterialLog(material, jsonLog.count, jsonLog.id, new Date(jsonLog.log_date), jsonLog.userId);
    }

    getChronologicalDelta(log: MaterialLog): number {
        if (this.isOlderThan(log)) {
            return log.quantity - this.quantity;
        } else {
            return this.quantity - log.quantity;
        }
    }

    getDelta(log: MaterialLog): number {
        return this.quantity - log.quantity;
    }

    isOlderThan(log: MaterialLog): boolean {
        return this.log_date.getTime() < log.log_date.getTime();
    }
}

