import {MaterialHistoryData} from "@/utils/types/export/MaterialHistoryData";
import {MaterialModel} from "@prisma/client";
import {QuantityOfDataTableItemJSON} from "@/utils/classes/ORM/QuantityOfItems/QuantityOfDataTableItem";

export type MaterialRecipeJSON = {
    require: QuantityOfDataTableItemJSON[],
    produce: QuantityOfDataTableItemJSON[],
    name: string
};

export interface MaterialInfo {
    history?: MaterialHistoryData | undefined
    idMaterials: string;
    material?: MaterialModel,
    recipes?: MaterialRecipeJSON[] | undefined
}