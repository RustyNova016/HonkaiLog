
import {TierIVLightningStone} from "./Test_Materials";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";

export const TierIVLightningStone12 = new MaterialInventory().insertMultipleFromJSON([
    {
        id: TierIVLightningStone.id,
        quantity: 12
    }
]);