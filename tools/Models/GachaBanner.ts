import {MaterialQuantity} from "./MaterialQuantity";
import {LogSource} from "@/utils/Objects/MaterialQuantityLog";
import {GachaBannerWithUserData} from "./GachaBannerWithUserData";
import {MaterialQuantityWithUserData} from "./MaterialQuantityWithUserData";

/** An object corresponding to a gacha banner. */
export class GachaBanner {
    /** Name of the banner */
    name: string

    /** The number of guaranties to complete the banner */
    nbGuarantyForCompletion: number

    /** The number of pull to do before hitting pity */
    nbPullsForGuaranty: number

    /** Cost to pull the gacha */
    pullCost: MaterialQuantity

    constructor(name: string, NbPullsForGuaranty: number, NbGuarantyForCompletion: number, pullCost: MaterialQuantity) {
        this.name = name;
        this.pullCost = pullCost;
        this.nbPullsForGuaranty = NbPullsForGuaranty;
        this.nbGuarantyForCompletion = NbGuarantyForCompletion;
    }

    /** The cost for completing the banner */
    public calcCostForCompletion(): MaterialQuantity {
        return new MaterialQuantity(
            this.pullCost.material,
            this.pullCost.quantity * this.calcNBPullsForBannerCompletion()
        )
    }

    /** The number of pull for full banner completion */
    calcNBPullsForBannerCompletion(): number {
        return this.nbPullsForGuaranty * this.nbGuarantyForCompletion;
    }
}