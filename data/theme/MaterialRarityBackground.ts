import {MaterialRarityType} from "@/utils/types/theme/MaterialRarityType";
import {routes} from "@/lib/routes";

export const materialRarityBackgroundMap = new Map<MaterialRarityType, string>([
    ["0", routes.materialRarityBackgrounds + "Material_Icon_Background_0S.png"],
    ["5", routes.materialRarityBackgrounds + "Material_Icon_Background_5S.png"]
])
