import {useRouter} from "next/router";
import {useMaterialWithLogs} from "./useMaterialWithLogs";
import {MaterialWithLogs} from "../../../tools/Models/MaterialWithLogs";

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
export function useMaterialWithLogsFromRouter(): MaterialWithLogs | undefined {
    const id = useRouterMaterialId();
    if (id === undefined) return undefined

    return useMaterialWithLogs(id)
}
