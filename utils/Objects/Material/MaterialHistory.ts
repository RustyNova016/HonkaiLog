import {MaterialLogCollection, Period} from "./MaterialLogCollection";
import {Material} from "@/utils/Objects/Material/Material";
import {z} from "zod";
import {MaterialQuantityLogArrayZod} from "@/lib/Zod/Validations/MaterialQuantityLog";
import {UserMaterialData, UserMaterialJSONZod} from "@/lib/Zod/Validations/UserMaterial";

export class MaterialHistory {
    /** The collection holding all the logs made by the user for the logs */
    public logCollection: MaterialLogCollection
    public material: Material
    /** Id of the user the data is from */
    public userID: string;

    constructor(material: Material, materialQuantityLogs: z.infer<typeof MaterialQuantityLogArrayZod>, userId: string) {
        this.material = material
        this.userID = userId;
        this.logCollection = MaterialLogCollection.parse(materialQuantityLogs, this);
    }

    get id() {
        return this.material.id
    }

    get name() {
        return this.material.name
    }

    static parse(data: UserMaterialData, userId: string) {
        return new MaterialHistory(Material.parse(data), data.materialQuantityLogs, userId)
    }

    public getLogs() {
        return this.logCollection;
    }

    public getName(plural?: boolean, startcase?: boolean): string {
        return this.material.getName(plural, startcase);
    }

    /** Export the logs to a plain object */
    public toJSON(): z.infer<typeof UserMaterialJSONZod> {
        return {
            id: this.id,
            name: this.name,
            materialQuantityLogs: this.logCollection.export(),
            userID: this.userID
        }
    }

    getHistoryForPeriod(period: Period): MaterialHistory {
        return new MaterialHistory(this.material, this.logCollection.getLogsInPeriod(period).export(), this.userID)
    }
}