import {MaterialLogDBResponse} from "../../database/material_log";
import {MaterialDBResponse} from "../../database/material";
import {UserDBResponse} from "../../database/user";

export interface IMaterialHistoryLog extends Omit<MaterialLogDBResponse, 'log_date'> {
    log_date: Date;
}

export class MaterialHistoryLog implements IMaterialHistoryLog {
    count: number;
    createdAt: string;
    id: number;
    log_date: Date;
    materialId: MaterialDBResponse["id"];
    updatedAt: string;
    userId: UserDBResponse["id"];

    constructor(materialLog: MaterialLogDBResponse) {
        this.id = materialLog.id;
        this.log_date = new Date(materialLog.log_date);
        this.count = materialLog.count;
        this.materialId = materialLog.materialId;
        this.userId = materialLog.userId;
        this.createdAt = materialLog.createdAt;
        this.updatedAt = materialLog.updatedAt;
    }

    /**
     * @deprecated The method should not be used
     */
    static getDelta(log1: MaterialHistoryLog, log2: MaterialHistoryLog): number {
        return log2.count - log1.count;
    }

    getChronologicalDelta(log: MaterialHistoryLog): number {
        if (this.isOlderThan(log)) {
            return log.count - this.count;
        } else {
            return this.count - log.count;
        }
    }

    isOlderThan(log: MaterialHistoryLog): boolean {
        return this.log_date.getTime() < log.log_date.getTime();
    }
}