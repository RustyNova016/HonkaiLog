import {MaterialQuantity} from "./MaterialQuantity";
import {z} from "zod";
import dayjs from "dayjs";
import {Material} from "@/utils/Objects/Material/Material";
import {MaterialQuantityLogJSONZod} from "@/utils/Objects/Material/validations/MaterialQuantityLog.JSONZod";

/** Snapshot of a quantity at a given time */
export class MaterialQuantityLog {
    /** ID of the log in the database */
    id: number | undefined;

    /** Date of the log */
    log_date: Date;
    materialQuantity: MaterialQuantity
    /** ID of the user having made the log */
    userId: string;

    constructor(id: number | undefined, log_date: Date, userId: string, materialQuantity: MaterialQuantity) {
        this.id = id;
        this.log_date = log_date;
        this.userId = userId;
        this.materialQuantity = materialQuantity
    }

    get logDate() {
        return dayjs(this.log_date);
    }

    get material() {
        return this.materialQuantity.material
    }

    get quantity() {
        return this.materialQuantity.quantity
    }

    /** If the user actually made this log */
    get verified(): boolean {
        return this.id === undefined
    }

    static parse(data: z.infer<typeof MaterialQuantityLogJSONZod>, material: Material) {
        // TODO: Check material id and user id
        return new MaterialQuantityLog(data.id, new Date(data.loggedAt), data.idUser, new MaterialQuantity(material, data.quantity))
    }

    public export(): z.infer<typeof MaterialQuantityLogJSONZod> {
        return {
            id: this.id,
            quantity: this.quantity,
            loggedAt: this.logDate.toJSON(),
            idMaterial: this.material.id,
            idUser: this.userId
        }
    }

    /** Return the difference of the quantity of logs between two logs sorted in chronological order*/
    public getChronologicalDifference(log: MaterialQuantityLog): number {
        if (this.madeBefore(log)) {
            return log.quantity - this.quantity;
        } else {
            return this.quantity - log.quantity;
        }
    }

    /** Return the difference of the quantity of logs between two logs */
    public getQuantityDifference(log: MaterialQuantityLog): number {
        return this.quantity - log.quantity;
    }

    public isSame(log: MaterialQuantityLog) {
        return this.id === log.id &&
            this.quantity === log.id &&
            this.log_date === log.log_date &&
            this.userId === log.userId &&
            this.material.id === log.material.id
    }

    /** Return true if the log was made before the log compared against */
    public madeBefore(log: MaterialQuantityLog): boolean {
        return this.logDate.isBefore(log.logDate)
    }
}

