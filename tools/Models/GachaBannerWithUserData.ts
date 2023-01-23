import {GachaBanner} from "@/utils/Objects/Gacha/GachaBanner";
import {MaterialQuantityWithUserData} from "./MaterialQuantityWithUserData";
import _ from "lodash";
import {MaterialQuantity} from "@/utils/Objects/Material/MaterialQuantity";
import {TimeRef} from "@/utils/TimeTools";
import {LogSource} from "@/utils/Types/LogSource";



/** A GachaBanner with access to the logs of the user for analytics */
export class GachaBannerWithUserData extends GachaBanner {
    /** Cost to pull the gacha */
    public pullCost: MaterialQuantityWithUserData

    /** Number of pull the user already did */
    public pullCount: number

    constructor(name: string, NbPullsForGuaranty: number, NbGuarantyForCompletion: number, pullCost: MaterialQuantityWithUserData, pullCount: number) {
        super(name, NbPullsForGuaranty, NbGuarantyForCompletion, pullCost);
        this.pullCost = pullCost;
        this.pullCount = pullCount;
    }

    /** How many pull the user can do with their funds */
    public calcNBPullsPossible(): number {
        const userFunds = this.pullCost.material.getLogs().getNewestLogOrThrow().quantity;
        const cost = this.pullCost.quantity;
        return _.floor(userFunds / cost, 0)
    }

    public calcTotalPulls(): number {
        return this.calcNBPullsPossible() + this.pullCount
    }

    /** Return the number of pulls left to complete the banner */
    public calcNBPullsRemainingForBannerCompletion(): number {
        return this.calcNBPullsForBannerCompletion() - this.pullCount;
    }

    /** Percentage of the banner capable to be done */
    public calcPercentageAchievable(): number {
        return _.round(100 * (this.calcNBPullsPossible() / this.calcNBPullsForBannerCompletion()), 2)
    }

    /** The remaining cost for completing the banner */
    public calcRemainingCostForCompletion(): MaterialQuantity {
        return new MaterialQuantity(this.pullCost.material, this.pullCost.quantity * this.calcNBPullsRemainingForBannerCompletion())
    }

    /** Return the time needed to get enough logs according to the current average gain */
    public calcTimeUntilEnoughFunds(timeValue: TimeRef = "days"): number {
        const remainingCostForCompletion = this.calcRemainingCostForCompletion()
        const remainingCostForCompletionWithUserData = MaterialQuantityWithUserData.convertMaterialQuantity(remainingCostForCompletion, this.pullCost);

        return remainingCostForCompletionWithUserData.calcTimeToMatchQuantity(timeValue);
    }

    /** Convert from GachaBanner */
    public static convertGachaBanner(gachaBanner: GachaBanner, userData: GachaBannerUserData){
        return new GachaBannerWithUserData(
            gachaBanner.name,
            gachaBanner.nbPullsForGuaranty,
            gachaBanner.nbGuarantyForCompletion,
            MaterialQuantityWithUserData.convertMaterialQuantity(gachaBanner.pullCost, userData.logSource),
            userData.pullCount
        )
    }
}

export interface GachaBannerUserData {
    logSource: LogSource,
    pullCount: number
}