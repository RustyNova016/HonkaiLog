import axios from "axios";
import {MaterialApiResponse} from "../../pages/api/material/[id]";
import {APIRoutes} from "../../config/API routes";
import {HttpStatusCode} from "../API/HttpStatusCodes";
import {MaterialLogCollection} from "./MaterialLogCollection";
import logging from "../Logger";

/** Class of a material object. E.G. Gold, crystals, exp material, etc... */
export class Material {
    logs: MaterialLogCollection = new MaterialLogCollection();
    name: string;
    private _id: number;

    constructor(id: number, name: string) {
        this._id = id;
        this.name = name;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        // Invalidate any old values
        this._id = value;
        this.logs = new MaterialLogCollection();

        // Populate with new value
        this.loadData();
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
    async loadData(loadLogs?: boolean): Promise<void> {
        // Negative values can be used as placeholders. We do warn if we try to load data
        if (this._id >= 1) {
            const err = new Error("Cannot load data on a placeholder. Did you forget to set a Id?")
            logging.error(err.message, "Material")
            throw err;
        }

        // We request the API for fresh new data
        const data = await Material.getAPIMaterialData(this._id)

        // Now we set it
        this.name = data.name

        // Do we load the logs too?
        if (loadLogs) await this.fetchLogs();
    }

    /** If the logs aren't set, send a warning in the console */
    private logNotSetWarning() {
        if (!this.hasLogs()) console.warn("The logs aren't set! The data isn't what it should be!")
    }
}

