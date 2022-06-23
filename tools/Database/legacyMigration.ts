import {legacyData} from "./legacyData";
import Material_log from "../../database/material_log";

export function addLegacyData() {
    const data = legacyData.filter((value, index, array) => {
        const isCorrectUser = value.id_user === "2";
        const isCorrectMaterial = value.id_material === "1"
        return isCorrectUser && isCorrectMaterial
    })

    const userId = "e736a1d4-ea2b-4aaf-99de-c749ce57cf55"
    const datawithcorrectvalues: any[] = []
    data.forEach((value, index, array) => {
        datawithcorrectvalues.push({
            id: value.id_log,
            count: value.quantity,
            log_date: value.time_stamp,
            createdAt: value.time_stamp,
            updatedAt: value.time_stamp,
            userId: userId,
            materialId: 1
        })
    })

    for (const datawithcorrectvalue of datawithcorrectvalues) {
        Material_log.create(datawithcorrectvalue)
    }
}