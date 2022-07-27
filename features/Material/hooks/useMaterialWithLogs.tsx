import {useMaterialLogsAPI} from "./useMaterialLogsAPI";
import {MaterialWithUserData} from "../../../tools/Models/MaterialWithUserData";
import {MaterialLog} from "../../../tools/Models/MaterialLog";
import {Material} from "../../../tools/Models/Material";
import {useMaterial} from "./useMaterial";

/** Retrieve a MaterialWithLogs object from the API */
export function useMaterialWithLogs(id: number): MaterialWithUserData | undefined {
    const {data, isError, isLoading} = useMaterialLogsAPI(id);
    const material = useMaterial(id)

    if (isError !== undefined) throw isError;

    if (data !== undefined && material !== undefined) {
        // First, convert the Material Object into a MaterialWithUserData object
        const userMat = material.addUserData([])

        // Then, convert the API results into MaterialLog objects and add them
        for (const materialLog of data.Material_logs) {
            userMat.logCollection.insertLogs(MaterialLog.fromJSON(materialLog, userMat));
        }

        return userMat
    }
}

