import {Material} from "@/utils/Objects/Material";
import {useMaterialAPI} from "./useMaterialAPI";

/** Retrieve a Material object from the API */
export function useMaterial(id: number): Material | undefined {
    const {data, isError, isLoading} = useMaterialAPI(id);

    if (isError !== undefined) throw isError;

    if (data !== undefined) {
        return Material.createMaterialFromAPIResponse(data)
    }
}