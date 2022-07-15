import useSWR from "swr";
import {IMaterialLogsAPIResponse} from "../../../pages/api/material/logs/[id]";
import {fetcher} from "./fetcher";
import {APIRoutes} from "../../../config/API routes";
import {Material} from "../../Models/Material";

export function useMaterial(materialId: number, fetchLogs?: boolean) {
    const key = APIRoutes.material + materialId;
    const {data, error} = useSWR<IMaterialLogsAPIResponse, Error>(key, fetcher);

    if (data !== undefined){
        return Material.getMaterialFromAPIResponse(data)
    }
}