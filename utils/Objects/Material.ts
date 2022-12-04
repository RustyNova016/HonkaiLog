import {MaterialAPIFetchResponse} from "../../pages/api/material/[id]";
import {MaterialWithUserData} from "./MaterialWithUserData";
import {LogSource} from "./MaterialQuantityLog";
import {z} from "zod";
import {MaterialDataZod, UserMaterialDataZod} from "@/lib/Validations/material";

/** Class of a material object. E.G. Gold, crystals, exp material, etc... */
export class Material {
    /** ID of the material in the database */
    public id: number;

    /** Name of the material */
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    /** Create a Material instance from a validation pattern */
    static parse(data: z.infer<typeof MaterialDataZod>, userId?: string){
        return new Material(data.id, data.name);
    }

    /** Create a Material instance with the data from the API 
     * @deprecated**/
    static createMaterialFromAPIResponse(res: MaterialAPIFetchResponse): Material {
        return new Material(res.id, res.name);
    }

    /** Create a new instance of the material with userdata
     * @deprecated
     */
    public addUserData(logSource: LogSource): MaterialWithUserData {
        return new MaterialWithUserData(this.id, this.name, logSource)
    }

    /** Output true if the material have the same ID */
    public isSameMaterial(mat: Material): boolean {
        // TODO: Deep comparison
        return this.id === mat.id;
    }
}