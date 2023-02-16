import {APIType} from "@/lib/External APIs/Hoyoverse/MaterialHistoryConverters";

export const CrystalAPIType: APIType = {
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

export const HoyoAPITypes = [
    CrystalAPIType
]