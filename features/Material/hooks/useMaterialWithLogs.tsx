import {useMaterialLogsAPI} from "./useMaterialLogsAPI";
import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import {MaterialQuantityLog} from "@/utils/Objects/MaterialQuantityLog";
import {Material} from "@/utils/Objects/Material";
import {useMaterial} from "./useMaterial";

/** Retrieve a MaterialWithLogs object from the API */
export function useMaterialWithLogs(id: number): MaterialWithUserData | undefined {
    const {data, isError, isLoading} = useMaterialLogsAPI(id);
    const material = useMaterial(id)

    if (isError !== undefined) throw isError;

    if (data !== undefined && material !== undefined) {
        // First, convert the Material Object into a MaterialWithUserData object
        const userMat = material.addUserData([])

        // Then, convert the API results into MaterialQuantityLog objects and add them
        for (const materialLog of data.Material_logs) {
            userMat.logCollection.insertLogs(MaterialQuantityLog.fromJSON(materialLog, userMat));
        }

        return userMat
    }
}

