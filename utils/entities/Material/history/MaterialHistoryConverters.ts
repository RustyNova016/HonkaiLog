import {MaterialLogData} from "@/utils/types/export/MaterialLogExport";
import dayjs from "dayjs";
import {z} from "zod";
import {DataLog, HoyoAPIData, HoyoAPIResponse} from "@/lib/External APIs/Hoyoverse/HoyoAPIResponse";
import {toPascalCase} from "@/utils/functions/ToPascalCase";
import {UserDataExport} from "@/utils/types/export/UserDataExport";
import {MaterialHistoryData} from "@/utils/types/export/MaterialHistoryData";
import {APIDataLogMapper, APIType, HoyoAPITypes} from "@/lib/External APIs/Hoyoverse/ApiTypes";
import {LogOrderType} from "@/utils/enums/LogOrderType";
import {MaterialQuantityLogModel} from ".prisma/client";

export class MaterialHistoryConverters {
    public static APIResArray_To_MaterialHistoryExports(apiRes: HoyoAPIResponse[], idUser: string): MaterialHistoryData[] {
        const histories = []

        for (const apiRe of apiRes) {
            histories.push(...this.APIData_to_MaterialHistoryExports(apiRe.data, HoyoAPITypes, idUser))
        }

        return histories
    }

    public static APIRes_To_UserDataExport(apiRes: HoyoAPIResponse, idUser: string): UserDataExport {
        return {
            idUser: idUser,
            materialHistories: this.APIData_to_MaterialHistoryExports(apiRes.data, HoyoAPITypes, idUser)
        }
    }

    private static APIData_to_MaterialHistoryExports(apiData: HoyoAPIData, apiTypes: APIType[], idUser: string): MaterialHistoryData[] {
        const histories = new Map<string, MaterialHistoryData>;

        for (const dataLog of apiData.list) {
            const apiType = this.getAPIType_From_APIData(dataLog, apiTypes);
            const idMaterial = toPascalCase(apiType.idMaterialGetter(dataLog));
            const history = histories.get(idMaterial);

            if (history === undefined) {
                histories.set(idMaterial, {
                    idMaterial: toPascalCase(idMaterial),
                    logOrder: LogOrderType.newestToOldest,
                    logs: [this.DataLog_to_LogExport(dataLog, apiType.mapper, dayjs(apiData.lastUpdateTime), idMaterial, idUser)]
                })
            } else {
                history.logs.push(this.DataLog_to_LogExport(dataLog, apiType.mapper, dayjs(apiData.lastUpdateTime), idMaterial, idUser))
                histories.set(idMaterial, history)
            }
        }

        return Array.from(histories, ([, value]) => value)
    }

    private static DataLog_to_LogExport(dataLog: DataLog, dataLogMapper: APIDataLogMapper, importTime: Date | dayjs.Dayjs, idMaterial: string, idUser: string): MaterialLogData {
        const data = dataLog.item;

        console.log(dataLog);
        const atTime = data[dataLogMapper.indexTime]?.value;
        const comment = data[dataLogMapper.indexComment]?.value;
        const quantityChange = data[dataLogMapper.indexQuantityChange]?.value;
        const quantityTotal = data[dataLogMapper.indexQuantityCurrent]?.value;
        return {
            atTime: dayjs(z.string().parse(atTime)).toJSON(),
            comment: z.string().parse(comment),
            quantityChange: quantityParser(quantityChange),
            quantityTotal: quantityParser(quantityTotal),
            idPreviousLog: null,
            idNextLog: null,
            importTime: importTime.toJSON(),
            id: null,
            idMaterial: idMaterial,
            idUser
        }
    }

    private static getAPIType_From_APIData(dataLog: DataLog, apiTypes: APIType[]): APIType {
        for (const apiType of apiTypes) {
            if (apiType.isTypeOfData(dataLog)) {return apiType}
        }

        throw new Error("Cannot find API type for DataLog. Please implement for: " + JSON.stringify(dataLog))
    }

    public static LogModels_to_HistoryData(data: MaterialQuantityLogModel[]): MaterialHistoryData {
        const idMaterial = data[0]?.idMaterial;
        if(idMaterial === undefined) {throw new Error("Error: No data")}

        return {
            idMaterial,
            logOrder: LogOrderType.noOrder,
            logs: data.map(value => this.LogModel_to_LogExport(value))
        }
    }

    private static LogModel_to_LogExport(data: MaterialQuantityLogModel): MaterialLogData {
        return {
            atTime: data.atTime.toJSON(),
            idNextLog: data.idNextLog,
            comment: data.comment,
            importTime: data.atTime.toJSON(),
            quantityTotal: data.quantityTotal,
            quantityChange: data.quantityChange,
            idPreviousLog: data.idPreviousLog,
            id: data.id,
            idMaterial: data.idMaterial,
            idUser: data.idUser
        }
    }
}

export function quantityParser(data: unknown): number {
    return z.number().int().parse(
        parseInt(
            z.string().parse(data)
        )
    );
}