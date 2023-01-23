import {MaterialLogCollection} from "@/utils/Objects/Material/MaterialLogCollection";
import {MaterialQuantityWithUserData} from "../../tools/Models/MaterialQuantityWithUserData";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {MaterialQuantityLog} from "@/utils/Objects/Material/MaterialQuantityLog";

export type LogSource =
    MaterialLogCollection
    | MaterialQuantityWithUserData
    | MaterialHistory
    | MaterialQuantityLog
    | MaterialQuantityLog[];