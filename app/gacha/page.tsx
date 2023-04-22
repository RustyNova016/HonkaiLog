import {FadingIn} from "@/components/Animators/FadingIn";
import {CenterContent} from "@/components/Layouts/CenterContent";
import {PageTitle} from "@/components/UI/Theme/PageTitle";
import {getIdUserServer} from "@/lib/NextAuth/GetSession";
import {EXPABanner} from "../../data/theme/gacha/GachaBanners";
import {EXPABannerComponent} from "@/app/gacha/EXPABanner";
import {MaterialGetter} from "@/utils/entities/Material/MaterialGetter";

export default async function Page() {
    const materials = MaterialGetter.getServerSideMaterialInfoArray(EXPABanner.possibleCosts.toKeyArray(), await getIdUserServer())


    /*    const historyCalculator = await MaterialORM.getMaterialHistoryCalculator("Crystal", (await getServerUser()).id, {period})

        const pullCost = new MaterialQuantity(historyCalculator.material, 280);
        const expaBannerRaw = new GachaBanner("Expa Banner", 100, 1, pullCost)
        const currentInventory = new MaterialQuantity(historyCalculator.material, historyCalculator.getCurrentCount())*/

    return <>
        <FadingIn duration={500} className={"size-inherit"} style={{overflow: "auto"}}>
            <CenterContent>
                <PageTitle title={"Gacha"}/>

                <EXPABannerComponent materialInfo={(await materials)}/>

                {/*<GachaBannerSummary bannerJSON={expaBannerRaw.export()}
                                    currentInventory={currentInventory.toJSON()}
                                    materialCalculator={historyCalculator.toJSON()}/>

                <FOCABanner pullCost={pullCost.toJSON()}
                            currentInventory={currentInventory.toJSON()}
                            materialCalculator={historyCalculator.toJSON()}/>*/}
            </CenterContent>
        </FadingIn>
    </>
}