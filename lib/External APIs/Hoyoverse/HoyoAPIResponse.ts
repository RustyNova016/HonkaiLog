export interface HoyoAPIResponse {
    data: HoyoAPIData
    message: string
    retcode: number;
}

export interface HoyoAPIData {
    lastUpdateTime: string;
    list: DataLog[]
    pageSize: number,
    userLastUpdateTime: string;
}

export type DataLog = {
    item: DataLogType
}

export type DataLogType = DataLogFieldType[]

export interface DataLogFieldType {
    label: string,
    value: string
}