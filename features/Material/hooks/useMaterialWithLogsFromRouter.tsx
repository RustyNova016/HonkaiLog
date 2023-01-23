import {useRouter} from "next/router";
import {useMaterialWithLogs} from "./useMaterialWithLogs";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";

/** Return the materialID parameter of the url */
export function useRouterMaterialId(): number | undefined {
    const {materialId} = useRouter().query

    if (typeof materialId === "string") {
        const intId = parseInt(materialId);
        if (!isNaN(intId)) {
            return intId
        }
    }

    return undefined
}

/** Give a MaterialWithLogs object directly from the router */
export function useMaterialWithLogsFromRouter(): MaterialHistory | undefined {
    const id = useRouterMaterialId();
    if (id === undefined) return undefined

    return useMaterialWithLogs(id)
}
