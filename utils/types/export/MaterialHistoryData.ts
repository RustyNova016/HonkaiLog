import {MaterialLogData} from "@/utils/types/export/MaterialLogExport";
import {LogOrderType} from "@/utils/enums/LogOrderType";

export type MaterialHistoryData = {
    idMaterial: string,
    /** Orders of the logs (If not specified by the log themselves */
    logOrder: LogOrderType,
    logs: MaterialLogData[]
};