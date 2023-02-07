import {z} from "zod";
import {MaterialJSONZod} from "@/utils/Objects/Material/validations/Material.JSONZod";
import _ from "lodash";

/** Class of a logs object. E.G. Gold, crystals, exp logs, etc... */
export class Material {
    /** ID of the logs in the database */
    public id: number;

    /** Name of the logs */
    public name: string;

    public namePlural: string | null;
    public imageLink: string | null;


    constructor(id: number, name: string, namePlural: string | null, imageLink: string | null) {
        this.id = id;
        this.name = name;
        this.namePlural = namePlural;
        this.imageLink = imageLink;
    }

    /** Create a Material instance from a validation pattern */
    static parse(data: z.infer<typeof MaterialJSONZod>): Material {
        const parsedData = MaterialJSONZod.parse(data);
        return new Material(parsedData.id, parsedData.name, parsedData.namePlural, parsedData.imageLink);
    }

    /** Export the logs to a plain object */
    public export(): z.infer<typeof MaterialJSONZod> {
        return {
            id: this.id,
            name: this.name,
            namePlural: this.namePlural,
            imageLink: this.imageLink
        }
    }

    /** Return the name of the logs, alongside some optional formatting */
    public toString(plural?: boolean, startcase?: boolean): string {
        let str: string = this.name;

        if (plural){
            str = this.namePlural === null ? this.name + "s" : this.namePlural;
        }

        return startcase ? _.startCase(str) : str
    }

    /** Output true if the logs have the same ID */
    public isSame(mat: Material): boolean {
        // TODO: Deep comparison
        return this.id === mat.id;
    }
}

