import {IMaterialCountAPIResponse} from "../../pages/api/material/count/[id]";
import {IMaterialLogDBResponse} from "../../database/material_log";

export class MaterialHistory implements IMaterialCountAPIResponse {
    Material_logs: IMaterialLogDBResponse[];
    id: number;
    name: string;

    constructor(materialCount: IMaterialCountAPIResponse) {
        this.Material_logs = materialCount.Material_logs;
        this.id = materialCount.id;
        this.name = materialCount.name;
    }
}