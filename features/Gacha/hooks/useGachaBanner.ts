import {GachaBanner} from "../../../tools/Models/GachaBanner";
import {MaterialQuantity} from "../../../tools/Models/MaterialQuantity";
import {useMaterial} from "../../Material/hooks/useMaterial";

/** Retrieve a GachaBanner object from the API */
export function useGachaBanner(bannerId: number) {
    //TODO: API call
    if (bannerId === 1) {
        const material = useMaterial(1);

        if (material !== undefined){
            const materialQuantity = new MaterialQuantity(material, 280);
            return new GachaBanner("FOCA", 100, 1, materialQuantity)
        }
    }
}