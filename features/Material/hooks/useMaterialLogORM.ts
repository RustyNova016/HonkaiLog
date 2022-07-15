import logger from "../../../tools/Logger";
import {Material} from "../../../tools/Models/Material";
import {useMaterialLogs} from "./useMaterialLogs";

export function useMaterialLogORM(id: number): Material | undefined {
    const {data, isError, isLoading} = useMaterialLogs(id);

    logger.info("Data from API: ", "useMaterialLogORM", data)

    if (isError !== undefined) throw isError;

    if (data !== undefined) {
        return Material.createMaterialFromAPIResponse(data)
    }
}