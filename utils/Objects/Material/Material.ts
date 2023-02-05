import {z} from "zod";
import {MaterialJSONZod} from "@/lib/Zod/Validations/MaterialJSONZod";
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

    /** Create a Material instance from a validation pattern */
    static parse(data: z.infer<typeof MaterialJSONZod>): Material {
        const parsedData = MaterialJSONZod.parse(data);
        return new Material(parsedData.id, parsedData.name);
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