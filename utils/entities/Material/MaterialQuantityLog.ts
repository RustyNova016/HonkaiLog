import {MaterialQuantityLogModel} from ".prisma/client";
import dayjs from "dayjs";
import {Override} from "openid-client";
import logger from "../../../tools/Logger";
import cuid2 from "@paralleldrive/cuid2";

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

    constructor(id: string | undefined = undefined, quantityTotal: number, atTime: Date, idMaterial: string, idUser: string, quantityChange: number | null = null, comment: string | null = null, idImport: string | null = null, public isGenerated: boolean = false) {
        if (id === undefined) {this.id = "GEN" + cuid2.createId()} else {this.id = id}
        this.quantityChange = quantityChange;
        this.comment = comment;
        this.atTime = atTime;
        this.idMaterial = idMaterial;
        this.idUser = idUser;
        this.idImport = idImport;
        this.quantityTotal = quantityTotal;
    }

    get atTimeAsDayJs() {
        return dayjs(this.atTime)
    }

    public static fromJSON(data: MaterialQuantityLogJSON): MaterialQuantityLog {
        return this.fromModel({
            ...data,
            atTime: dayjs(data.atTime).toDate()
        })
    }

    public static fromModel(data: MaterialQuantityLogModel) {
        return new MaterialQuantityLog(undefined, data.quantityTotal, data.atTime, data.idMaterial, data.idUser, data.quantityChange, data.comment, data.idImport)
    }

    public createLogBefore() {
        if (this.quantityChange === null) {
            logger.info("No change record", "[MaterialLogCollection/createLogBefore]")
            return
        }

        const atTimeMinus1 = this.atTimeAsDayJs.add(-1, "second");
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

    /** Return the difference of the quantity of logs between two logs */
    public getQuantityDifference(log: MaterialQuantityLog): number {
        return this.quantityTotal - log.quantityTotal;
    }

    public hasSameIndex(log: MaterialQuantityLogModelIndex): boolean {
        return this.atTimeAsDayJs.isSame(log.atTime, "seconds") &&
            this.idUser === log.idUser &&
            this.idMaterial === log.idMaterial
    }

    public isSame(log: MaterialQuantityLog) {
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
        return this
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