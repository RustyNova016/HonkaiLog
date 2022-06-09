import useSWR from "swr";
import {fetcher} from "./useMaterial";
import {IMaterialLogs} from "../../../pages/api/material/count/[id]";

export function useMaterialLogs(id: number) {
    const key = `/api/material/count/${id}`;
    const {data, error} = useSWR<IMaterialLogs, Error>(key, fetcher);
    return {
        materialLogs: data,
        isLoading: !error && !data,
        isError: error
    }
}