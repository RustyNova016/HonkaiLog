import {MaterialLogCollection} from "./MaterialLogCollection";
import logging from "../Logger";
import {MaterialQuantity} from "./MaterialQuantity";
import {MaterialAPI} from "./MaterialAPI";
import {HookHandler} from "../React/HookHandler";
import {MaterialAPIFetchResponse} from "../../pages/api/material/[id]";
import {MaterialLogsAPIFetchResponse} from "../../pages/api/material/logs/[id]";

/** Class of a material object. E.G. Gold, crystals, exp material, etc... */
export class Material extends MaterialAPI {
    public loadLogs: boolean = false
    public loadingHooks: HookHandler<boolean> = new HookHandler<boolean>()
    public logs: MaterialLogCollection = new MaterialLogCollection(this);
    public materialHooks: HookHandler<Material> = new HookHandler<Material>()
    public name: string;
    public id: number;

    constructor(id: number, name: string) {
        super();
        this.id = id;
        this.name = name;
    }



    async addNewLog(count: number) {
        await this.logs.addNewLog(new MaterialQuantity(this, count))
    }

    async fetchLogs() {
        this.loadLogs = true
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
        if (this.id < 1) {
            const err = new Error("Cannot load data on a placeholder. Did you forget to set a Id?")
            logging.error(err.message, "Material")
            throw err;
        }

        // We request the API for fresh new data
        const data = await Material.getAPIMaterialData(this.id)

        // Now we set it
        this.name = data.name

        // Do we load the logs too?
        if (loadLogs) await this.fetchLogs();
    }

    /** Force the update of the hooks, and rerender components */
    public async refreshPageData() {
        this.loadingHooks.setHookValue(true)

        // We clean the hooks with a dummy material
        const dummyMaterial = new Material(-1, "Loading");
        this.materialHooks.setHookValue(dummyMaterial)

        // Because of React's hook updates, we need to create a new instance of the class
        const newMaterial = await Material.getMaterialFromId(this.id)

        console.log("Should we load the logs?", this.loadLogs)
        if (this.loadLogs) {
            console.log("Loading logs!")
            newMaterial.loadLogs = true
            await newMaterial.fetchLogs()
        } else {
            console.log("Not loading logs")
        }

        // Now we put it in all the hooks
        this.materialHooks.setHookValue(newMaterial)
        this.loadingHooks.setHookValue(false)
    }

    /** If the logs aren't set, send a warning in the console */
    private logNotSetWarning() {
        if (!this.hasLogs()) console.warn("The logs aren't set! The data isn't what it should be!")
    }

    /** Create a new instance of the material with the latest data from the API */
    public async createNewInstance(): Promise<Material> {
        const newMaterial = await Material.getMaterialFromId(this.id)

        // We check if the logs are loaded. If so, the new material should also load the logs
        if (this.logs.loaded) {
            newMaterial.loadLogs = true
            await newMaterial.fetchLogs()
        }

        return newMaterial
    }

    static createMaterialFromAPIResponse(res: MaterialAPIFetchResponse|MaterialLogsAPIFetchResponse): Material {
        const material = new Material(res.id, res.name);

        if ("Material_logs" in res && res.Material_logs !== undefined){
            material.logs.loadAPIData(res)
        }

        return material
    }
}