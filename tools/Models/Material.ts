import axios from "axios";
import {MaterialApiResponse} from "../../pages/api/material/[id]";
import {APIRoutes} from "../../config/API routes";
import {HttpStatusCode} from "../API/HttpStatusCodes";
import {MaterialLogCollection} from "./MaterialLogCollection";

/** Class of a material object. E.G. Gold, crystals, exp material, etc... */
export class Material {
    id: number;
    logs: MaterialLogCollection = new MaterialLogCollection();
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    /** Ask the API for the data of a material. */
    static async getAPIMaterialData(id: number): Promise<MaterialApiResponse> {
        const materialResponse = await axios.get<MaterialApiResponse>(APIRoutes.material + id)

        if (materialResponse.status === HttpStatusCode.Ok) {
            const data = materialResponse.data;

            if (data === null) throw new Error("Api returned null")

            return data;
        } else {
            throw new Error("Cannot get Material")
        }
    }

    static async getMaterialFromId(id: number): Promise<Material> {
        const data = await Material.getAPIMaterialData(id)
        return new Material(data.id, data.name)
    }

    async fetchLogs() {
        await this.logs.fetchLogsOfMaterial(this)
    }

    /** Return the current count of material that the user has in game... Well, the count they last logged. */
    getInGameCount() {
        this.logNotSetWarning();
        return this.logs.getCurrentCount();
    }

    hasLogs() {
        return this.logs.loaded;
    }

    /** Load the object with the latest data in the API. */
    loadData(loadLogs?: boolean) {

    }

    /** If the logs aren't set, send a warning in the console */
    private logNotSetWarning() {
        if (!this.hasLogs()) console.warn("The logs aren't set! The data isn't what it should be!")
    }
}

