import {IMaterialCountAPIResponse} from "../../pages/api/material/count/[id]";
import {IMaterialLogDBResponse} from "../../database/material_log";
import {toTimestamp} from "../miscs";

export class MaterialHistory implements IMaterialCountAPIResponse {
    Material_logs: IMaterialLogDBResponse[];
    id: number;
    name: string;

    constructor(materialCount: IMaterialCountAPIResponse) {
        this.Material_logs = materialCount.Material_logs.sort((a: IMaterialLogDBResponse, b: IMaterialLogDBResponse) => {
            return toTimestamp(a.log_date) - toTimestamp(b.log_date)
        });
        this.id = materialCount.id;
        this.name = materialCount.name;
    }

    getCurrentCount(): number {
        return this.getLatestLog().count;
    }

    getLatestLog() {
        return this.Material_logs[this.Material_logs.length - 1];
    }


}