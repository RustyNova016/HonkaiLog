import {LogOrderType} from "@/prisma/ORMs/MaterialQuantityLogORM";
import {MaterialLogExport} from "@/utils/types/export/MaterialLogExport";

export type MaterialHistoryExport = {
    idMaterial: string,
    logOrder: LogOrderType,
    logs: MaterialLogExport[]
};