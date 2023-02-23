import {z} from "zod";
import {MaterialJSONZod} from "@/utils/entities/Material/validations/Material.JSONZod";
import _ from "lodash";
import {MaterialModel} from "@prisma/client";
import {materialRarityBackgroundMap} from "../../../data/theme/MaterialRarityBackground";
import {routes} from "@/lib/routes";
import {MaterialLogCollection} from "@/utils/entities/Material/MaterialLogCollection";

/** Class of a logs object. E.G. Gold, crystals, exp logs, etc... */
export class Material implements MaterialModel {
    constructor(
        public id: string,
        public name: string,
        public _namePlural: string | null = null,
        public _imageLink: string | null = null,
        public rarity: any = undefined
    ) {
    }

    private _history: MaterialLogCollection | undefined;

    get history(): MaterialLogCollection {
        if (this._history === undefined) {throw new Error("Error: History isn't defined. Use the MaterialBuilder class")}
        return this._history;
    }

    set history(value: MaterialLogCollection) {
        if (value.idMaterial !== this.id) {throw new Error("Error: History is incompatible with this material")}
        this._history = value;
    }

    get imageLink(): string {
        if (this._imageLink === null) {
            return routes.materialIcons + this.id + ".png"
        }
        return routes.materialIcons + this._imageLink
    }

    get namePlural(): string {
        if (this._namePlural === null || this._namePlural === "" || this._namePlural === undefined) {
            return this.name + "s"
        }
        return this._namePlural;
    }

    public static fromJSON(data: MaterialJSON): Material {
        return Material.fromModel(data)
    }

    public static fromModel(data: MaterialModel): Material {
        //if (!isMaterialRarityType(data.rarity)) {
        //    throw new Error("Unknown Rarity")
        //}

        return new Material(data.id, data.name, data.namePlural, data.imageLink, data.rarity)
    }

    /** Create a Material instance from a validation pattern */
    static parse(data: z.infer<typeof MaterialJSONZod>): Material {
        return this.fromModel(data)
    }

    /** Export the logs to a plain object */
    public export(): z.infer<typeof MaterialJSONZod> {
        return {
            id: this.id,
            name: this.name,
            namePlural: this._namePlural,
            imageLink: this._imageLink
        }
    }

    public getRarityBackgroundImage() {
        let str = materialRarityBackgroundMap.get(this.rarity);
        if (str === undefined) {
            str = materialRarityBackgroundMap.get(this.rarity);
            if (str === undefined) {
                return ""
            }
        }
        return str;
    }

    /** Output true if the logs have the same ID */
    public isSame(mat: Material): boolean {
        // TODO: Deep comparison
        return this.id === mat.id;
    }

    public toJSON(): MaterialJSON {
        return Object.assign({}, this.toModel());
    }

    public toModel(): MaterialModel {
        return this;
    }

    /** Return the name of the logs, alongside some optional formatting */
    public toString(plural?: boolean, startcase?: boolean): string {
        let str: string = plural ? this.namePlural : this.name
        return startcase ? _.startCase(str) : str
    }
}

export type MaterialJSON = MaterialModel