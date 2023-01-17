import {MaterialAPIFetchResponse} from "../../pages/api/material/[id]";
import {MaterialWithUserData} from "./MaterialWithUserData";
import {LogSource} from "./MaterialQuantityLog";
import {z} from "zod";
import {MaterialDataZod} from "@/lib/Zod/Validations/material";
import _ from "lodash";

/** Class of a logs object. E.G. Gold, crystals, exp logs, etc... */
export class Material {
    /** ID of the logs in the database */
    public id: number;

    /** Name of the logs */
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    /** Create a Material instance with the data from the API
     * @deprecated**/
    static createMaterialFromAPIResponse(res: MaterialAPIFetchResponse): Material {
        return new Material(res.id, res.name);
    }

    /** Create a Material instance from a validation pattern */
    static parse(data: z.infer<typeof MaterialDataZod>, userId?: string) {
        return new Material(data.id, data.name);
    }

    /** Create a new instance of the logs with userdata
     * @deprecated
     */
    public addUserData(logSource: LogSource): MaterialWithUserData {
        return new MaterialWithUserData(this.id, this.name, logSource)
    }

    /** Export the logs to a plain object */
    public export(): z.infer<typeof MaterialDataZod> {
        return {
            id: this.id,
            name: this.name
        }
    }

    /** Return the name of the logs, alongside some optional formatting */
    public getName(plural?: boolean, startcase?: boolean) {
        const name = plural ? this.name + "s" : this.name;
        return startcase ? _.startCase(name) : name
    }

    /** Output true if the logs have the same ID */
    public isSameMaterial(mat: Material): boolean {
        // TODO: Deep comparison
        return this.id === mat.id;
    }
}