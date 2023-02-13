import {MaterialQuantityLogModel} from ".prisma/client";
import dayjs from "dayjs";
import {Override} from "openid-client";
import logger from "../../../tools/Logger";
import cuid2 from "@paralleldrive/cuid2";
import {dayTs, DayTs} from "@/lib/DayJs/DayTs";
import {BlockPlacement} from "@/utils/enums/BlockPlacement";

export type MaterialQuantityLogModelIndex = { atTime: Date, idUser: string, idMaterial: string };

/** Snapshot of a quantity at a given time */
export class MaterialQuantityLog implements MaterialQuantityLogModel {
    atTime: Date;
    comment: string | null;
    id: string;
    idImport: string | null;
    idMaterial: string;
    idUser: string;
    quantityChange: number | null;
    quantityTotal: number;

    constructor(id: string | undefined = undefined, quantityTotal: number, atTime: Date, idMaterial: string, idUser: string, quantityChange: number | null = null, comment: string | null = null, idImport: string | null = null, public idNextLog: string | null
        = null) {
        if (id === undefined) {this.id = "GEN" + cuid2.createId()} else {this.id = id}
        this.quantityChange = quantityChange;
        this.comment = comment;
        this.atTime = atTime;
        this.idMaterial = idMaterial;
        this.idUser = idUser;
        this.idImport = idImport;
        this.quantityTotal = quantityTotal;
    }

    public static link(previousLog: MaterialQuantityLog, nextLog: MaterialQuantityLog|null){
        if(nextLog === null) {previousLog.idNextLog = null};
        previousLog.
    }

    get origin(): LogOrigin{
        if(this.idImport !== null) {return LogOrigin.Official}
        if(this.id.substring(0,3) === "GEN"){return LogOrigin.Generated}
        return LogOrigin.UserMade
    }

    get atTimeAsDayTs(): DayTs {
        return dayTs(this.atTime)
    }

    public static fromJSON(data: MaterialQuantityLogJSON): MaterialQuantityLog {
        return this.fromModel({
            ...data,
            atTime: dayjs(data.atTime).toDate()
        })
    }

    public isPlaced(logToCompare: MaterialQuantityLog): BlockPlacement {
        const dateComparison = this.compareDate(logToCompare);
        if (dateComparison === DateComparison.before) {return BlockPlacement.before}
        if (dateComparison === DateComparison.after) {return BlockPlacement.after}

        const change = this.quantityChange !== null? this.quantityChange : 0;
        if(logToCompare.quantityTotal < this.quantityTotal + change) {return BlockPlacement.after}

        const changeOnBase = logToCompare.quantityChange !== null? logToCompare.quantityChange : 0;
        if(logToCompare.quantityTotal + changeOnBase > this.quantityTotal) {return BlockPlacement.before}

        throw new Error("The log is invalid")
    }

    public static fromModel(data: MaterialQuantityLogModel) {
        return new MaterialQuantityLog(data.id, data.quantityTotal, data.atTime, data.idMaterial, data.idUser, data.quantityChange, data.comment, data.idImport, data.idNextLog)
    }

    public createLogBefore() {
        if (this.quantityChange === null) {
            logger.info("No change record", "[MaterialLogCollection/createLogBefore]")
            return
        }

        const atTimeMinus1 = this.atTimeAsDayTs.add(-1, "second");
        return new MaterialQuantityLog(undefined, this.quantityTotal - this.quantityChange, atTimeMinus1.toDate(), this.idMaterial, this.idUser, null, "Calculated quantity at " + atTimeMinus1.toString())
    }

    /** Return the difference of the quantity of logs between two logs sorted in chronological order*/
    public getChronologicalDifference(log: MaterialQuantityLog): number {
        if (this.madeBefore(log)) {
            return log.quantityTotal - this.quantityTotal;
        } else {
            return this.quantityTotal - log.quantityTotal;
        }
    }

    public compareDate(log: MaterialQuantityLog): DateComparison {
        return this.atTimeAsDayTs.compareDates(log.atTime)
    }

    /** Return the difference of the quantity of logs between two logs */
    public getQuantityDifference(log: MaterialQuantityLog): number {
        return this.quantityTotal - log.quantityTotal;
    }

    public hasSameIndex(log: MaterialQuantityLogModelIndex): boolean {
        return this.atTimeAsDayTs.isSame(log.atTime, "seconds") &&
            this.idUser === log.idUser &&
            this.idMaterial === log.idMaterial
    }

    public isSame(log: MaterialQuantityLog) {
        return this.quantityTotal === log.quantityTotal &&
            this.atTimeAsDayTs.isSame(log.atTimeAsDayTs) &&
            this.idUser === log.idUser &&
            this.idMaterial === log.idMaterial
    }

    /** Return true if the log was made before the log compared against */
    public madeBefore(log: MaterialQuantityLog): boolean {
        return this.atTimeAsDayTs.isBefore(log.atTimeAsDayTs)
    }

    public toJSON(): MaterialQuantityLogJSON {
        return {
            ...this.toModel(),
            atTime: this.atTime.toJSON()
        }
    }

    public toModel(): MaterialQuantityLogModel {
        return this
    }

    public weakCompare(log: MaterialQuantityLog): boolean {
        const sameTime = this.atTimeAsDayTs.isSame(log.atTimeAsDayTs);
        const sameQuantity = this.quantityTotal === log.quantityTotal
        const sameMaterial = this.idMaterial === log.idMaterial
        const sameUser = this.idUser === log.idUser

        return sameTime && sameQuantity && sameMaterial && sameUser;
    }
}

export enum LogOrigin {
    Official,
    UserMade,
    Generated,
}

export type MaterialQuantityLogJSON = Override<MaterialQuantityLogModel, { atTime: string }>

export enum DateComparison {
    before,
    same,
    after
}