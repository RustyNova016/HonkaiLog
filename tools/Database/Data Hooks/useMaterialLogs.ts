import useSWR from "swr";
import {IMaterialLogsAPIResponse} from "../../../pages/api/material/logs/[id]";
import {fetcher} from "./fetcher";
import {Material} from "../../Models/Material";

export function useMaterialLogs(id: number) {
    const key = `/api/material/logs/${id}`;
    const {data, error} = useSWR<IMaterialLogsAPIResponse, Error>(key, fetcher);

    return {
        materialLogsResponse: data,
        isLoading: error === undefined && data === undefined,
        isError: error
    }
}

export function useMaterialLogsWithObj(id: number) {
    const key = `/api/material/logs/${id}`;
    const {data, error} = useSWR<IMaterialLogsAPIResponse, Error>(key, fetcher);


    return {
        materialLogsResponse: data,
        isLoading: error === undefined && data === undefined,
        isError: error
    }
}