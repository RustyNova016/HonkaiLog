import {MaterialLogCollection} from "./MaterialLogCollection";
import logging from "../Logger";
import {MaterialQuantity} from "./MaterialQuantity";
import {MaterialAPI} from "./MaterialAPI";

/** Class of a material object. E.G. Gold, crystals, exp material, etc... */
export class Material extends MaterialAPI {
    public loadCallbacks: ((a: Material) => void)[] = []
    public loadLogs: boolean = false
    public logs: MaterialLogCollection = new MaterialLogCollection();
    public name: string;
    public stateHooks: ((a: Material) => void)[] = []
    private _id: number;

    constructor(id: number, name: string) {
        super();
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

    async addNewLog(count: number) {
        await this.logs.addNewLog(new MaterialQuantity(this, count))
        await this.refreshPageData()
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
        if (this._id < 1) {
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

    /** Force the update of the hooks, and rerender components */
    public async refreshPageData() {
        // We clean the hooks with a dummy material
        for (const stateHook of this.stateHooks) {
            stateHook(new Material(-1, "Loading"));
        }

        // Because of React's hook updates, we need to create a new instance of the class
        const newMaterial = await Material.getMaterialFromId(this.id)

        if (this.loadLogs) {await newMaterial.fetchLogs()}

        // Now we put it in all the hooks
        for (const stateHook of this.stateHooks) {
            stateHook(newMaterial);
        }

        console.log("Refreshed")
    }

    /** If the logs aren't set, send a warning in the console */
    private logNotSetWarning() {
        if (!this.hasLogs()) console.warn("The logs aren't set! The data isn't what it should be!")
    }
}