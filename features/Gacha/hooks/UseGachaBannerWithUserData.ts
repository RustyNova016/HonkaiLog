/** Retrieve a GachaBannerWithUserData object from the API */
import {useGachaBanner} from "./useGachaBanner";
import {useMaterialWithLogs} from "../../Material/hooks/useMaterialWithLogs";
import {GachaBannerWithUserData} from "../../../tools/Models/GachaBannerWithUserData";

export function useGachaBannerWithUserData(bannerId: number) {
    const banner = useGachaBanner(bannerId);

    if (banner !== undefined){
        //TODO: API call
        if (bannerId === 1){
            const materialWithLogs = useMaterialWithLogs(banner.pullCost.material.id);
            if (materialWithLogs !== undefined){
                return GachaBannerWithUserData.convertGachaBanner(banner, {logSource: materialWithLogs, pullCount: 0})
            }
        }
    }
}