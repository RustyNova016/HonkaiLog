import useSWR from "swr";
import {Material_response} from "../../../database/material";
import axios from "axios";

export async function fetcher<T>(key: string): Promise<T> {
    return await axios.get(key).then((res) => res.data);
}

export function useMaterial(id: number) {
    const key = `/api/material/${id}`;
    const {data, error} = useSWR<Material_response, Error>(key, fetcher);
    return {
        material: data,
        isLoading: !error && !data,
        isError: error
    }
}