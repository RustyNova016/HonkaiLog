import {useMaterialLogsAPI} from "./useMaterialLogsAPI";
import {MaterialWithLogs} from "../../../tools/Models/MaterialWithLogs";

/** Give a MaterialWithLogs object */
export function useMaterialWithLogs(id: number): MaterialWithLogs | undefined {
    const {data, isError, isLoading} = useMaterialLogsAPI(id);

    if (isError !== undefined) throw isError;

    if (data !== undefined) {
        return MaterialWithLogs.createMaterialWithLogsFromAPIResponse(data)
    }
}

