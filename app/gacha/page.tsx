import {MaterialQuantityWithUserData} from "../../tools/Models/MaterialQuantityWithUserData";
import {getMaterialWithUserData} from "@/app/history/[materialId]/getUserMaterialData";
import {GachaBanner} from "@/utils/Objects/Gacha/GachaBanner";
import {FadingIn} from "@/components/Animators/FadingIn";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {PageTitle} from "../../component/pageComponents/Theme/Theme";
import {GachaBannerSummary} from "@/app/gacha/gachaBannerSummary";
import {MaterialQuantity} from "@/utils/Objects/Material/MaterialQuantity";
import dayjs from "dayjs";

export interface GachaBannerData {
    name: string,
    pullCost: MaterialQuantityWithUserData
}

export default async function Page() {
    const period = {start: dayjs().add(-40, "day"), end: dayjs()};

    const materialHistory = (await getMaterialWithUserData(1)).getHistoryForPeriod(period);
    const materialQuantityWithUserData = new MaterialQuantity(materialHistory.material, 280);
    const expaBannerRaw = new GachaBanner("Expa Banner", 100, 1, materialQuantityWithUserData)
    const currentInventory = new MaterialQuantity(materialHistory.material, materialHistory.getLogs().getCurrentCount())

    const materialHistorySel = (await getMaterialWithUserData(7)).getHistoryForPeriod(period);
    const materialQuantityWithUserDataSel = new MaterialQuantity(materialHistorySel.material, 280);
    const expaBannerRawSel = new GachaBanner("Selene Banner", 100, 1, materialQuantityWithUserData)
    const currentInventorySel = new MaterialQuantity(materialHistorySel.material, materialHistorySel.getLogs().getCurrentCount())

    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={"Gacha"}/>

                <GachaBannerSummary bannerJSON={expaBannerRaw.export()} currentInventory={currentInventory.toJSON()}
                                    materialUsageData={materialHistory.toJSON()} idUser={materialHistory.userID}/>
                <GachaBannerSummary bannerJSON={expaBannerRawSel.export()}
                                    currentInventory={currentInventorySel.toJSON()}
                                    materialUsageData={materialHistorySel.toJSON()} idUser={materialHistorySel.userID}/>
            </CenterContent>
        </FadingIn>
    </>
}