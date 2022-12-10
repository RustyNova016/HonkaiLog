import {UserDBResponse} from "../../database/user";
import {MaterialQuantity} from "../../tools/Models/MaterialQuantity";
import axios from "axios";
import {APIRoutes} from "../../data/API routes";
import logger from "../../tools/Logger";
import {MaterialLogItemJSON} from "../../database/material_logs";
import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import {MaterialQuantityWithUserData} from "../../tools/Models/MaterialQuantityWithUserData";
import {ITimeframe} from "../../context/TimeframeContext";
import {MaterialLogCollection} from "./MaterialLogCollection";
import {z} from "zod";
import {MaterialQuantityCreateReq, MaterialQuantityLogZod} from "@/lib/Zod/Validations/MaterialQuantityLog";

export type LogSource =
    MaterialLogCollection
    | MaterialQuantityWithUserData
    | MaterialWithUserData
    | MaterialQuantityLog
    | MaterialQuantityLog[];

export async function saveMaterialQuantityLogFromMatQuan(quantity: MaterialQuantity) {
    return await axios.post(APIRoutes.materialLogs, {
        count: quantity.quantity,
        materialId: quantity.material.id
    });
}

export async function saveMaterialQuantityLog(data: z.infer<typeof MaterialQuantityCreateReq>) {
    return await axios.post(APIRoutes.materialLogs, MaterialQuantityCreateReq.parse(data));
}

/** Snapshot of a quantity at a given time */
export class MaterialQuantityLog extends MaterialQuantity {
    /** ID of the log in the database */
    id: number;

    /** Date of the log */
    log_date: Date;

    /** ID of the user having made the log */
    userId: UserDBResponse["id"];

    constructor(id: number, quantity: number, material: MaterialWithUserData, log_date: Date, userId: string) {
        super(material, quantity);
        this.id = id;
        this.log_date = log_date;
        this.userId = userId;
    }

    /** Create a MaterialQuantityLog instance from a json object
     * @deprecated */
    static fromJSON(jsonLog: MaterialLogItemJSON, material: MaterialWithUserData): MaterialQuantityLog {
        return new MaterialQuantityLog(jsonLog.id, jsonLog.quantity, material, new Date(jsonLog.log_date), jsonLog.userId);
    }

    /** Create a log and save it to the database */
    static async makeLog(quantity: MaterialQuantity) {
        const res = await saveMaterialQuantityLogFromMatQuan(quantity)

        logger.info("Done sending!", "Material Log")

        // TODO: check for errors
    }

    static parse(data: z.infer<typeof MaterialQuantityLogZod>, material: MaterialWithUserData) {
        return new MaterialQuantityLog(data.id, data.quantity, material, new Date(data.loggedAt), material.userID)
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

        if (logSource instanceof MaterialWithUserData) {
            return this.toLogs(logSource.logCollection)
        }

        return logSource;
    }

    /** Return the difference of the quantity of material between two logs sorted in chronological order*/
    public getChronologicalDifference(log: MaterialQuantityLog): number {
        if (this.isOlderThan(log)) {
            return log.quantity - this.quantity;
        } else {
            return this.quantity - log.quantity;
        }
    }

    /** Return the difference of the quantity of material between two logs */
    public getQuantityDifference(log: MaterialQuantityLog): number {
        return this.quantity - log.quantity;
    }

    /** Return true if the log was made during that timeframe */
    public inTimeframe(timeframe: ITimeframe) {
        const afterStart = new Date(this.log_date) >= timeframe.start;
        const beforeEnd = new Date(this.log_date) <= timeframe.end;
        return afterStart && beforeEnd;
    }

    /** Return true if the log is older than the log compared against*/
    public isOlderThan(log: MaterialQuantityLog): boolean {
        return this.log_date.getTime() < log.log_date.getTime();
    }
}

