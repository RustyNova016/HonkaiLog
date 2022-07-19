import {legacyData} from "./legacyData";
import material_log from "../../database/material_log";
import axios from "axios";
import {APIRoutes} from "../../data/API routes";

export async function addLegacyData() {
    const data = legacyData.filter((value, index, array) => {
        const isCorrectUser = value.id_user === "2";
        const isCorrectMaterial = value.id_material === "1";

        return isCorrectUser && isCorrectMaterial
    })

    const userId = "e736a1d4-ea2b-4aaf-99de-c749ce57cf55"
    const datawithcorrectvalues: any[] = []
    data.forEach((value, index, array) => {
        datawithcorrectvalues.push({
            id: value.id_log,
            count: value.quantity,
            log_date: value.time_stamp,
            materialId: 1,
            userId: "e736a1d4-ea2b-4aaf-99de-c749ce57cf55",
            createdAt: value.time_stamp,
            updatedAt: value.time_stamp
        })
    })

    for (const datawithcorrectvalue of datawithcorrectvalues) {
        const res = await axios.post(APIRoutes.materialLogs, datawithcorrectvalue).catch(reason => {throw new Error(reason)})
    }
}