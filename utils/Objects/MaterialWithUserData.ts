import {MaterialLogCollection} from "./MaterialLogCollection";
import {Material} from "@/utils/Objects/Material";
import {z} from "zod";
import {MaterialQuantityLogJSONArrayZod, UserMaterialDataZod} from "@/lib/Validations/material";

export class MaterialWithUserData extends Material {
    /** The collection holding all the logs made by the user for the material */
    public logCollection: MaterialLogCollection

    /** Id of the user the data is from */
    public userID: string;

    constructor(id: number, name: string, logArray: z.infer<typeof MaterialQuantityLogJSONArrayZod>, userId: string) {
        super(id, name);
        this.userID = userId;
        this.logCollection = MaterialLogCollection.parse(logArray, this);
    }

    static override parse(data: z.infer<typeof UserMaterialDataZod>, userId: string) {
        return new MaterialWithUserData(data.id, data.name, data.Material_logs, userId)
    }
}