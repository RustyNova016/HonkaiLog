
import {TierIVLightningStone} from "./Test_Materials";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";

export const TierIVLightningStone12 = new MaterialInventory().insertMultipleFromJSON([
    {
        id: TierIVLightningStone.id,
        quantity: 12
    }
]);

export const TierIVLightningStone200 = new MaterialInventory().insertMultipleFromJSON([
    {
        id: TierIVLightningStone.id,
        quantity: 200
    }
]);

export const G4ELecStigma = new MaterialInventory().insertMultipleFromJSON([
    {
        id: "G4ElecStigma",
        quantity: 1
    }
]);