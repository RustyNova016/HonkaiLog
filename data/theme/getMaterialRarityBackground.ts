import {Material} from "@/utils/entities/Material/Material";
import {MaterialRarity} from "@/utils/entities/Material/MaterialRarity";

export const Rarity0 = new MaterialRarity("Material_Icon_Background_0S", "#777777", 0)


export function getMaterialRarity(material: Material): MaterialRarity {
    return Rarity0
}