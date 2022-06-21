import useSWR from "swr";
import axios from "axios";
import {MaterialDBResponse} from "../../../database/material";

export async function fetcher<T>(key: string): Promise<T> {
    return await axios.get(key).then((res) => res.data).catch((e) => {
        console.log(e)
        throw e;
    });
}

export function useMaterial(id: number) {
    const key = `/api/material/${id}`;
    const {data, error} = useSWR<MaterialDBResponse, Error>(key, fetcher);
    return {
        material: data,
        isLoading: !error && !data,
        isError: error
    }
}