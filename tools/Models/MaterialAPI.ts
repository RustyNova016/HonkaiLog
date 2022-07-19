import {MaterialAPIFetchResponse} from "../../pages/api/material/[id]";
import axios from "axios";
import {APIRoutes} from "../../data/API routes";
import {HttpStatusCode} from "../API/HttpStatusCodes";
import {Material} from "./Material";

/** @deprecated */
export class MaterialAPI {
    /** Ask the API for the data of a material.
     *  @deprecated
     */
    static async getAPIMaterialData(id: number): Promise<MaterialAPIFetchResponse> {
        const materialResponse = await axios.get<MaterialAPIFetchResponse>(APIRoutes.material + id)

        if (materialResponse.status === HttpStatusCode.Ok) {
            const data = materialResponse.data;

            if (data === null) throw new Error("Api returned null")

            return data;
        } else {
            throw new Error("Cannot get Material")
        }
    }

    /** Create a Material instance with populated data
     *  @deprecated
     */
    static async getMaterialFromId(id: number): Promise<Material> {
        const data = await Material.getAPIMaterialData(id)
        return new Material(data.id, data.name)
    }
}