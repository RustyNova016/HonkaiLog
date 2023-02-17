import {MaterialLogExport} from "@/utils/types/export/MaterialLogExport";
import {LogOrderType} from "@/utils/enums/LogOrderType";

export type MaterialHistoryExport = {
    idMaterial: string,
    logOrder: LogOrderType,
    logs: MaterialLogExport[]
};