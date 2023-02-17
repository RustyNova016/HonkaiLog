import {MaterialLogExport} from "@/utils/types/export/MaterialLogExport";
import dayjs from "dayjs";
import {z} from "zod";
import {DataLog, HoyoAPIData, HoyoAPIResponse} from "@/lib/External APIs/Hoyoverse/HoyoAPIResponse";
import {toPascalCase} from "@/utils/functions/ToPascalCase";
import {UserDataExport} from "@/utils/types/export/UserDataExport";
import {MaterialHistoryExport} from "@/utils/types/export/MaterialHistoryExport";
import {APIDataLogMapper, APIType, HoyoAPITypes} from "./ApiTypes";
import {LogOrderType} from "@/utils/enums/LogOrderType";

export class MaterialHistoryConverters {
    public static APIResArray_To_MaterialHistoryExports(apiRes: HoyoAPIResponse[]): MaterialHistoryExport[] {
        const histories = []

        for (const apiRe of apiRes) {
            histories.push(...this.APIData_to_MaterialHistoryExports(apiRe.data, HoyoAPITypes))
        }

        return histories
    }

    public static APIRes_To_UserDataExport(apiRes: HoyoAPIResponse, idUser: string): UserDataExport {
        return {
            idUser: idUser,
            MaterialHistory: this.APIData_to_MaterialHistoryExports(apiRes.data, HoyoAPITypes)
        }
    }

    private static APIData_to_MaterialHistoryExports(apiData: HoyoAPIData, apiTypes: APIType[]): MaterialHistoryExport[] {
        const histories = new Map<string, MaterialHistoryExport>;

        for (const dataLog of apiData.list) {
            const apiType = this.getAPIType_From_APIData(dataLog, apiTypes);
            const idMaterial = toPascalCase(apiType.idMaterialGetter(dataLog));
            const history = histories.get(idMaterial);

            if (history === undefined) {
                histories.set(idMaterial, {
                    idMaterial: toPascalCase(idMaterial),
                    logOrder: LogOrderType.newestToOldest,
                    logs: [this.DataLog_to_LogExport(dataLog, apiType.mapper, dayjs(apiData.lastUpdateTime))]
                })
            } else {
                history.logs.push(this.DataLog_to_LogExport(dataLog, apiType.mapper, dayjs(apiData.lastUpdateTime)))
                histories.set(idMaterial, history)
            }
        }

        return Array.from(histories, ([, value]) => value)
    }

    private static DataLog_to_LogExport(dataLog: DataLog, dataLogMapper: APIDataLogMapper, importTime: Date | dayjs.Dayjs): MaterialLogExport {
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
        }
    }

    private static getAPIType_From_APIData(dataLog: DataLog, apiTypes: APIType[]): APIType {
        for (const apiType of apiTypes) {
            if (apiType.isTypeOfData(dataLog)) {return apiType}
        }

        throw new Error("Cannot find API type for DataLog. Please implement for: " + JSON.stringify(dataLog))
    }
}

export function quantityParser(data: unknown): number {
    return z.number().int().parse(
        parseInt(
            z.string().parse(data)
        )
    );
}