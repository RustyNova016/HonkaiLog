import useSWR from "swr";
import {fetcher} from "./useMaterial";
import {IMaterialLogsAPIResponse} from "../../../pages/api/material/logs/[id]";

export function useMaterialLogs(id: number) {
    const key = `/api/material/logs/${id}`;
    const {data, error} = useSWR<IMaterialLogsAPIResponse, Error>(key, fetcher);

    return {
        materialLogsResponse: data,
        isLoading: error === undefined && data === undefined,
        isError: error
    }
}