import {Material} from "../../../tools/Models/Material";
import {useMaterialLogsAPI} from "./useMaterialLogsAPI";
import {useMaterialAPI} from "./useMaterialAPI";

/** Give a Material object */
export function useMaterial(id: number, logs?: boolean): Material | undefined {
    let swrHookResult;

    if (logs){
        swrHookResult = useMaterialLogsAPI(id);
    } else {
        swrHookResult = useMaterialAPI(id);
    }

    const {data, isError, isLoading} = swrHookResult

    if (isError !== undefined) throw isError;

    if (data !== undefined) {
        return Material.createMaterialFromAPIResponse(data)
    }
}