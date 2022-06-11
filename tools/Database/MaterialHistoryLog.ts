import {IMaterialLogDBResponse} from "../../database/material_log";

export interface IMaterialHistoryLog extends Omit<IMaterialLogDBResponse, 'log_date'> {
    log_date: Date;
}

export class MaterialHistoryLog implements IMaterialHistoryLog {
    id: number;
    log_date: Date;
    count: number;

    constructor(materialLog: IMaterialLogDBResponse) {
        this.id = materialLog.id;
        this.log_date = new Date(materialLog.log_date);
        this.count = materialLog.count;
    }

    static getDelta(log1: MaterialHistoryLog, log2: MaterialHistoryLog): number {
        return log2.count - log1.count;
    }
}