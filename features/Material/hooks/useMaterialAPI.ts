import {MaterialLogsAPIFetchResponse} from "../../../pages/api/material/logs/[id]";
import {APIRoutes} from "../../../data/API routes";
import {SWRHookResult} from "../../../lib/SWR/SWRHookResult";
import {useSWRhook} from "../../../lib/SWR/useSWRhook";

/** SWR hook that give material data from the API */
export function useMaterialAPI(materialId: number): SWRHookResult<MaterialLogsAPIFetchResponse> {
    const key = APIRoutes.material + materialId;
    return useSWRhook<MaterialLogsAPIFetchResponse>(key)
}