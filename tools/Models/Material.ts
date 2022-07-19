import {MaterialAPI} from "./MaterialAPI";
import {MaterialAPIFetchResponse} from "../../pages/api/material/[id]";
import {MaterialLogsAPIFetchResponse} from "../../pages/api/material/logs/[id]";
import {MaterialWithLogs} from "./MaterialWithLogs";
import {MaterialLog} from "./MaterialLog";

/** Class of a material object. E.G. Gold, crystals, exp material, etc... */
export class Material extends MaterialAPI {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        super();
        this.id = id;
        this.name = name;
    }

    /** Create a Material instance with the data from the API */
    static createMaterialFromAPIResponse(res: MaterialAPIFetchResponse): Material {
        return new Material(res.id, res.name);
    }

    /** Create a new instance of the material with logs */
    public addLogs(logs?: MaterialLog[], APIResponseData?: MaterialLogsAPIFetchResponse): MaterialWithLogs {
        return new MaterialWithLogs(this.id, this.name, logs, APIResponseData)
    }

    /** Output true if the material have the same ID */
    public isSameMaterial(mat: Material): boolean {
        return this.id === mat.id;
    }
}