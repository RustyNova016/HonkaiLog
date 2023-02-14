import {MaterialQuantityLog} from "@/utils/entities/Material/MaterialQuantityLog";
import {MaterialLogCollection} from "@/utils/entities/Material/MaterialLogCollection";

export function addLogBeforeChangeGenerator(collection: MaterialLogCollection){
    const logs: MaterialQuantityLog[] = []

    for (const log of collection.logs) {
        const item = addLogBeforeChange(log);
        if (item !== undefined){
            logs.push(item)
        }
    }

    return logs
}

export function addLogBeforeChange(log: MaterialQuantityLog): MaterialQuantityLog | undefined {
    if(log.quantityChange === null || log.quantityChange === 0) {return;}

    return new MaterialQuantityLog(
        undefined,
        log.quantityTotal - log.quantityChange,
        log.atTime,
        log.idMaterial,
        log.idUser,
        null,
        "", //TODO: Add generation comment
        null,
        null
    )
}