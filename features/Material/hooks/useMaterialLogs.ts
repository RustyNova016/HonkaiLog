import {MaterialLogsAPIFetchResponse} from "../../../pages/api/material/logs/[id]";
import {useSWRhook} from "../../../lib/SWR/useSWRhook";
import {SWRHookResult} from "../../../lib/SWR/SWRHookResult";

export function getUseMaterialLogsKey(id: number) {
    return `/api/material/logs/${id}`;
}

/** SWR hook that give a Material data alongside its logs */
export function useMaterialLogs(id: number): SWRHookResult<MaterialLogsAPIFetchResponse> {
    return useSWRhook<MaterialLogsAPIFetchResponse>(getUseMaterialLogsKey(id))
}

