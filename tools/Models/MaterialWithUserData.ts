import {MaterialLogCollection} from "./MaterialLogCollection";
import {LogSource} from "./MaterialLog";
import {Material} from "./Material";

export class MaterialWithUserData extends Material {
    /** The collection holding all the logs made by the user for the material */
    public logCollection: MaterialLogCollection

    constructor(id: number, name: string, logSource: LogSource) {
        super(id, name);
        this.logCollection = new MaterialLogCollection(this, logSource)
    }
}