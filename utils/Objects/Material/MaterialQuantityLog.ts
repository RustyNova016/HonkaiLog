import {UserDBResponse} from "../../../database/user";
import {MaterialQuantity} from "./MaterialQuantity";
import logger from "../../../tools/Logger";
import {MaterialLogItemJSON} from "../../../database/material_logs";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {MaterialQuantityWithUserData} from "../../../tools/Models/MaterialQuantityWithUserData";
import {ITimeframe} from "../../../context/TimeframeContext";
import {MaterialLogCollection} from "./MaterialLogCollection";
import {z} from "zod";
import {MaterialQuantityLogZod} from "@/lib/Zod/Validations/MaterialQuantityLog";
import dayjs from "dayjs";
import {saveMaterialQuantityLogFromMatQuan} from "@/utils/Objects/Funcs/SaveMaterialQuantityLogFromMatQuan";
import {LogSource} from "@/utils/Types/LogSource";

/** Snapshot of a quantity at a given time */
export class MaterialQuantityLog {
    /** ID of the log in the database */
    id: number | undefined;

    /** Date of the log */
    log_date: Date;
    materialQuantity: MaterialQuantity
    /** ID of the user having made the log */
    userId: UserDBResponse["id"];

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

    /** Create a MaterialQuantityLog instance from a json object
     * @deprecated */
    static fromJSON(jsonLog: MaterialLogItemJSON, material: MaterialHistory): MaterialQuantityLog {
        return new MaterialQuantityLog(jsonLog.id, new Date(jsonLog.log_date), jsonLog.userId);
    }

    /** Create a log and save it to the database */
    static async makeLog(quantity: MaterialQuantity) {
        const res = await saveMaterialQuantityLogFromMatQuan(quantity)

        logger.info("Done sending!", "Material Log")

        // TODO: check for errors
    }

    static parse(data: z.infer<typeof MaterialQuantityLogZod>, material: MaterialHistory) {
        return new MaterialQuantityLog(data.id, new Date(data.loggedAt), material.userID, new MaterialQuantity(material, data.quantity))
    }

    /** Convert anything log related to MaterialQuantityLog */
    public static toLogs(logSource: LogSource): MaterialQuantityLog[] {
        if (logSource instanceof Array) {
            return logSource
        }

        if (logSource instanceof MaterialQuantityLog) {
            return [logSource]
        }

        if (logSource instanceof MaterialLogCollection) {
            return logSource.logs
        }

        if (logSource instanceof MaterialQuantityWithUserData) {
            return this.toLogs(logSource.material.logCollection)
        }

        if (logSource instanceof MaterialHistory) {
            return this.toLogs(logSource.logCollection)
        }

        return logSource;
    }

    public export(): z.infer<typeof MaterialQuantityLogZod> {
        return {
            id: this.id,
            quantity: this.quantity,
            loggedAt: this.logDate.toString(),
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

    /** Return true if the log was made during that timeframe */
    public inTimeframe(timeframe: ITimeframe) {
        const afterStart = new Date(this.log_date) >= timeframe.start;
        const beforeEnd = new Date(this.log_date) <= timeframe.end;
        return afterStart && beforeEnd;
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
