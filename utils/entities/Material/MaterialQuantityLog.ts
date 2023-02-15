import {MaterialQuantityLogModel} from ".prisma/client";
import dayjs from "dayjs";
import {Override} from "openid-client";
import logger from "../../../tools/Logger";
import cuid2 from "@paralleldrive/cuid2";
import {dayTs} from "@/lib/DayJs/DayTs";
import {BlockPlacement} from "@/utils/enums/BlockPlacement";
import {Block} from "@/utils/classes/Block";
import {compareDates} from "@/utils/functions/CompareDate";

export type MaterialQuantityLogModelIndex = { atTime: Date, idUser: string, idMaterial: string };

/** Snapshot of a quantity at a given time */
export class MaterialQuantityLog extends Block<MaterialQuantityLog> implements MaterialQuantityLogModel {
    atTime: Date;
    private _comment: string | null;
    idImport: string | null;
    idMaterial: string;
    public idNextLog: string | null
    idUser: string;
    quantityChange: number | null;
    quantityTotal: number;

    constructor(id: string | undefined = undefined, quantityTotal: number, atTime: Date, idMaterial: string, idUser: string, quantityChange: number | null = null, comment: string | null = null, idImport: string | null = null, idNextLog: string | null
        = null) {
        if (id === undefined) {id = "GEN" + cuid2.createId()}
        super(id);
        this.quantityChange = quantityChange;
        this._comment = comment;
        this.atTime = atTime;
        this.idMaterial = idMaterial;
        this.idUser = idUser;
        this.idImport = idImport;
        this.quantityTotal = quantityTotal;
        this.idNextLog = idNextLog
    }

    get atTimeAsDayJs() {
        return dayjs(this.atTime)
    }

    get origin(): LogOrigin {
        if (this.idImport !== null) {return LogOrigin.Official}
        if (this.id.substring(0, 3) === "GEN") {return LogOrigin.Generated}
        return LogOrigin.UserMade
    }

    public static fromJSON(data: MaterialQuantityLogJSON): MaterialQuantityLog {
        return this.fromModel({
            ...data,
            atTime: dayjs(data.atTime).toDate()
        })
    }

    public static fromModel(data: MaterialQuantityLogModel) {
        return new MaterialQuantityLog(data.id, data.quantityTotal, data.atTime, data.idMaterial, data.idUser, data.quantityChange, data.comment, data.idImport, data.idNextLog)
    }

    get atTimeAsDayTs() {
        return dayTs(this.atTime);
    }

    public compareLogDates(log: MaterialQuantityLog): DateComparison {
        return compareDates(this.atTime, log.atTime)
    }

    public copy(): MaterialQuantityLog {
        return MaterialQuantityLog.fromModel(this.toModel())
    }

    public createLogBefore() {
        if (this.quantityChange === null) {
            logger.info("No change record", "[MaterialLogCollection/createLogBefore]")
            return
        }

        const atTimeMinus1 = this.atTimeAsDayJs.add(-1, "second");
        return new MaterialQuantityLog(undefined, this.quantityTotal - this.quantityChange, atTimeMinus1.toDate(), this.idMaterial, this.idUser, null, "Calculated quantity at " + atTimeMinus1.toString())
    }

    get quantityChangeOrZero(): number {
        if(this.quantityChange === null) {return 0}
        return this.quantityChange
    }

    /** Return the difference of the quantity of logs between two logs sorted in chronological order
     * @deprecated
     * */
    public getChronologicalDifference(log: MaterialQuantityLog): number {
        if (this.madeBefore(log)) {
            return log.quantityTotal - this.quantityTotal;
        } else {
            return this.quantityTotal - log.quantityTotal;
        }
    }

    /** Return the difference of the quantity of logs between two logs */
    public getQuantityDifference(log: MaterialQuantityLog): number {
        return this.quantityTotal - log.quantityTotal;
    }

    public hasSameIndex(log: MaterialQuantityLogModelIndex): boolean {
        return this.atTimeAsDayJs.isSame(log.atTime, "seconds") &&
            this.idUser === log.idUser &&
            this.idMaterial === log.idMaterial
    }

    public isPlaced(logToCompare: MaterialQuantityLog): BlockPlacement {
        if (this.idNextLog === logToCompare.id) {return BlockPlacement.before}
        if (logToCompare.idNextLog === this.id) {return BlockPlacement.after}

        const dateComparison = this.compareLogDates(logToCompare);
        if (dateComparison === DateComparison.before) {return BlockPlacement.before}
        if (dateComparison === DateComparison.after) {return BlockPlacement.after}

        const change = this.quantityChange !== null ? this.quantityChange : 0;
        if (logToCompare.quantityTotal < this.quantityTotal + change) {return BlockPlacement.after}

        const changeOnBase = logToCompare.quantityChange !== null ? logToCompare.quantityChange : 0;
        if (logToCompare.quantityTotal + changeOnBase > this.quantityTotal) {return BlockPlacement.before}

        throw new Error("The log is invalid")
    }

    public override isSame(log: MaterialQuantityLog) {
        return this.quantityTotal === log.quantityTotal &&
            this.atTimeAsDayJs.isSame(log.atTimeAsDayJs) &&
            this.idUser === log.idUser &&
            this.idMaterial === log.idMaterial
    }

    /** Return true if the log was made before the log compared against */
    public madeBefore(log: MaterialQuantityLog): boolean {
        return this.atTimeAsDayJs.isBefore(log.atTimeAsDayJs)
    }

    public toJSON(): MaterialQuantityLogJSON {
        return {
            ...this.toModel(),
            atTime: this.atTime.toJSON()
        }
    }

    public toModel(): MaterialQuantityLogModel {
        return {
            idUser: this.idUser,
            idMaterial: this.idMaterial,
            idNextLog: this.idNextLog,
            idImport: this.idImport,
            atTime: this.atTime,
            id: this.id,
            quantityTotal: this.quantityTotal,
            comment: this._comment,
            quantityChange: this.quantityChange
        }
    }

    get comment(): string | null {
        if(this._comment === null && this.origin === LogOrigin.Generated){
            return "Supposed quantity at this time"
        }
        return this._comment;
    }

    get quantityBefore(): number {
        if(this.quantityChange === null) {return this.quantityTotal}
        return this.quantityTotal - this.quantityChange;
    }

    public override toString(): string {
        return `<div>
                    Logged at: ${this.atTime.toLocaleDateString()} ${this.atTime.toLocaleTimeString()}<br/>
                    Quantity: ${this.quantityTotal} ${this.quantityChange !== null? `(${this.quantityChange})`: ""}<br/>
                    ${this.comment}<br/>
                    ${this.origin === LogOrigin.Generated? "(Generated)": ""}
                </div>`
    }

    public weakCompare(log: MaterialQuantityLog): boolean {
        const sameTime = this.atTimeAsDayJs.isSame(log.atTimeAsDayJs);
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