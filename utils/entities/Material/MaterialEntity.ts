import {z} from "zod";
import {MaterialJSONZod} from "@/utils/entities/Material/validations/Material.JSONZod";
import _ from "lodash";
import {MaterialModel} from "@prisma/client";

/** Class of a logs object. E.G. Gold, crystals, exp logs, etc... */
export class MaterialEntity implements MaterialModel {
    constructor(
        public id: string,
        public name: string,
        public _namePlural: string | null,
        public imageLink: string | null) {
    }


    get namePlural(): string {
        if (this._namePlural === null || this._namePlural === "") {
            return this.name + "s"
        }
        return this._namePlural;
    }

    public static fromModel(data: MaterialModel): MaterialEntity {
        return new MaterialEntity(
            data.id,
            data.name,
            data.namePlural,
            data.imageLink
        )
    }

    /** Create a Material instance from a validation pattern */
    static parse(data: z.infer<typeof MaterialJSONZod>): MaterialEntity {
        const parsedData = MaterialJSONZod.parse(data);
        return new MaterialEntity(parsedData.id, parsedData.name, parsedData.namePlural, parsedData.imageLink);
    }

    /** Export the logs to a plain object */
    public export(): z.infer<typeof MaterialJSONZod> {
        return {
            id: this.id,
            name: this.name,
            namePlural: this._namePlural,
            imageLink: this.imageLink
        }
    }

    /** Output true if the logs have the same ID */
    public isSame(mat: MaterialEntity): boolean {
        // TODO: Deep comparison
        return this.id === mat.id;
    }

    public toModel(): MaterialModel {
        return this;
    }

    /** Return the name of the logs, alongside some optional formatting */
    public toString(plural?: boolean, startcase?: boolean): string {
        let str: string = plural ? this.namePlural : this.name
        return startcase ? _.startCase(str) : str
    }

    public toJSON(): MaterialJSON{
        return Object.assign({}, this.toModel());
    }

    public static fromJSON(data: MaterialJSON): MaterialEntity {
        return MaterialEntity.fromModel(data)
    }
}

export type MaterialJSON = MaterialModel