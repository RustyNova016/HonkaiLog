import {MaterialAPIFetchResponse} from "../../../pages/api/material/[id]";
import {MaterialHistory} from "./MaterialHistory";
import {z} from "zod";
import {MaterialJSONZod} from "@/lib/Zod/Validations/MaterialJSONZod";
import _ from "lodash";
import {LogSource} from "@/utils/Types/LogSource";

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
    static parse(data: z.infer<typeof MaterialJSONZod>): Material {
        const parsedData = MaterialJSONZod.parse(data);
        return new Material(parsedData.id, parsedData.name);
    }

    /** Create a new instance of the logs with userdata
     * @deprecated
     * @ts-ignore
     */
    public addUserData(logSource: LogSource): MaterialHistory {
        // @ts-ignore
        return new MaterialHistory(this.id, this.name, logSource)
    }

    /** Export the logs to a plain object */
    public export(): z.infer<typeof MaterialJSONZod> {
        return {
            id: this.id,
            name: this.name
        }
    }

    /** Return the name of the logs, alongside some optional formatting */
    public toString(plural?: boolean, startcase?: boolean): string {
        const name = plural ? this.name + "s" : this.name;
        return startcase ? _.startCase(name) : name
    }

    /** Output true if the logs have the same ID */
    public isSame(mat: Material): boolean {
        // TODO: Deep comparison
        return this.id === mat.id;
    }
}