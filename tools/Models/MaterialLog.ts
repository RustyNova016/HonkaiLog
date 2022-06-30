import {UserDBResponse} from "../../database/user";
import {Material} from "./Material";
import {MaterialQuantity} from "./MaterialQuantity";
import axios from "axios";
import {APIRoutes} from "../../config/API routes";

/** Snapshot of a quantity at a given time */
export class MaterialLog extends MaterialQuantity {
    id: number;
    log_date: Date;
    userId: UserDBResponse["id"];

    constructor(material: Material, quantity: number, id: number, log_date: Date, userId: UserDBResponse["id"]) {
        super(material, quantity);
        this.id = id;
        this.log_date = log_date;
        this.userId = userId;
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

    static async createNewLog(quantity: MaterialQuantity){
        const res = await axios.post(APIRoutes.materialLogs, {count: quantity.quantity, MaterialId: quantity.material.id})

        // TODO: check for errors
    }
}

