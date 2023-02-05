import {MaterialLogCollection, Period} from "./MaterialLogCollection";
import {Material} from "@/utils/Objects/Material/Material";
import {z} from "zod";
import {UserMaterialData, UserMaterialJSONZod} from "@/lib/Zod/Validations/UserMaterial";

export class MaterialHistory {
    /** The collection holding all the logs made by the user for the logs */
    public readonly logCollection: MaterialLogCollection
    /** The material concerned */
    public readonly material: Material
    /** Id of the user the data is from */
    public readonly userID: string;

    constructor(material: Material, materialQuantityLogs: MaterialLogCollection, userId: string) {
        this.material = material
        this.userID = userId;
        this.logCollection = materialQuantityLogs
    }

    public copy(): MaterialHistory {return MaterialHistory.parse(this.toJSON(), this.userID)}

    get id() {
        return this.material.id
    }

    get name() {
        return this.material.name
    }

    static parse(data: UserMaterialData, userId: string) {
        const newMaterial = Material.parse(data);
        return new MaterialHistory(newMaterial, MaterialLogCollection.parse(data.materialQuantityLogs, newMaterial), userId)
    }

    /** Filter the logs to only keep the ones inside a given period */
    public filterPeriod(period: Period): MaterialHistory {
        return new MaterialHistory(this.material, this.logCollection.getLogsInPeriod(period), this.userID)
    }

    public getLogs() {
        return this.logCollection;
    }

    public toString(plural?: boolean, startcase?: boolean): string {
        return this.material.toString(plural, startcase);
    }

    public hasLogs(): boolean {
        return this.logCollection.logs.length !== 0;
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
}