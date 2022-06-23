import {UserDBResponse} from "../../database/user";
import {Material} from "./Material";
import {MaterialQuantity} from "./MaterialQuantity";

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
}

