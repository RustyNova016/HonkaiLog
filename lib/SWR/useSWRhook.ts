import useSWR from "swr";
import {fetcher} from "../Axios/fetcher";
import {SWRHookResult} from "./SWRHookResult";

/** Allow the creation of a SWR hook */
export function useSWRhook<datatype extends object>(key: string): SWRHookResult<datatype> {
    const {data, error} = useSWR<datatype, Error>(key, fetcher);

    return {
        data: data,
        isLoading: error === undefined && data === undefined,
        isError: error
    }
}