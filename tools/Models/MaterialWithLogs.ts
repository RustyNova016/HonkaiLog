import {MaterialLogCollection} from "./MaterialLogCollection";
import {MaterialLog} from "./MaterialLog";
import {MaterialLogsAPIFetchResponse} from "../../pages/api/material/logs/[id]";
import {Material} from "./Material";
import {MaterialQuantity} from "./MaterialQuantity";

export class MaterialWithLogs extends Material {
    public logs: MaterialLogCollection

    constructor(id: number, name: string, logs?: MaterialLog[], APIResponseData?: MaterialLogsAPIFetchResponse) {
        super(id, name);
        this.logs = MaterialLogCollection.getMaterialLogCollection(this, logs, APIResponseData)
    }

    /** Create a MaterialWithLogs instance with the data from the API */
    static createMaterialWithLogsFromAPIResponse(res: MaterialLogsAPIFetchResponse): MaterialWithLogs {
        return new MaterialWithLogs(res.id, res.name, undefined, res);
    }

    /** Return the current count of material that the user has in game... Well, the count they last logged.
     *  @deprecated
     */
    getInGameCount() {
        return this.logs.getCurrentCount();
    }
}