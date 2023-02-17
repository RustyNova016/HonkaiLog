import {DataLog} from "@/lib/External APIs/Hoyoverse/HoyoAPIResponse";

export type APIDataLogMapper = {
    indexTime: number,
    indexComment: number,
    indexQuantityChange: number,
    indexQuantityCurrent: number,
}

export type APIType = {
    name: string
    url: string,
    isTypeOfData: (data: DataLog) => boolean
    idMaterialGetter: (data: DataLog) => string
    mapper: APIDataLogMapper,
    urlParams?: { [key: string]: string|number }
}


export const CrystalAPIType: APIType = {
    name: "Crystal API",
    url: "GetUserHCoin",
    isTypeOfData: data => data.item[2]?.label === "Crystals Changed",
    idMaterialGetter: () => "Crystal",
    mapper: {
        indexTime: 0,
        indexComment: 1,
        indexQuantityChange: 2,
        indexQuantityCurrent: 3
    }
}

export const UserMaterialAPIType: APIType = {
    name: "Material API",
    url: "GetUserMaterial",
    isTypeOfData: data => data.item[2]?.label === "Material Name",
    idMaterialGetter: data => data.item[2]?.value as string,
    mapper: {
        indexTime: 0,
        indexComment: 1,
        indexQuantityChange: 3,
        indexQuantityCurrent: 4
    },
    urlParams: {
        type: 4
    }
}

export const HoyoAPITypes = [
    CrystalAPIType,
    UserMaterialAPIType
]