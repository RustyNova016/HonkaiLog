import axios from "axios";
import {MaterialApiResponse} from "../../pages/api/material/[id]";
import {APIRoutes} from "../../config/API routes";
import {HttpStatusCode} from "../API/HttpStatusCodes";
import {MaterialLogCollection} from "./MaterialLogCollection";

/** Class of a material object. E.G. Gold, crystals, gems, ETC */
export class Material {
    id: number;
    name: string;
    logs: MaterialLogCollection | "loading" = "loading";

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    static async getMaterialFromId(id: number): Promise<Material> {
        const materialResponse = await axios.get<MaterialApiResponse>(APIRoutes.material + id)

        if (materialResponse.status === HttpStatusCode.Ok) {
            const data = materialResponse.data;

            if (data === null) throw new Error("Api returned null")

            return new Material(data.id, data.name)
        } else {
            throw new Error("Cannot get Material")
        }
    }

    async fetchLogs() {
        this.logs = await MaterialLogCollection.getLogsOfMaterial(this)
    }
}

