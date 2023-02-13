import {MaterialQuantityLog} from "@/utils/entities/Material/MaterialQuantityLog";
import {MaterialLogCollection} from "@/utils/entities/Material/MaterialLogCollection";

export function addLogBeforeChange(log: MaterialQuantityLog, collection: MaterialLogCollection): MaterialQuantityLog | undefined {
    if(log.quantityChange === null) {return;}

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