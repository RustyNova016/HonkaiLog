import {MaterialQuantity, MaterialQuantityInterface} from "@/utils/Objects/Material/MaterialQuantity";
import _ from "lodash";
import {GachaBanner} from "./GachaBanner";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {MaterialQuantityCalculator} from "@/utils/Objects/Material/MaterialQuantityCalculator";
import {Material} from "@/utils/Objects/Material/Material";


export class GachaBannerCalculator {
    currentInventory: MaterialQuantityInterface
    currentPullCount: number
    gachaBanner: GachaBanner
    materialHistory: MaterialHistory

    constructor(gachaBanner: GachaBanner, currentInventory: MaterialQuantityInterface, materialHistory: MaterialHistory, currentPullCount: number = 0) {
        this.gachaBanner = gachaBanner;
        this.currentInventory = currentInventory;
        this.materialHistory = materialHistory;
        this.currentPullCount = currentPullCount
    }

    get material(): Material {
        return this.materialHistory.material;
    }

    get pullCost() {
        return this.gachaBanner.pullCost
    }

    public canCompleteGacha(): boolean {
        return this.getNbrOfPullsPossible() > this.getNbrPullsLeft()
    }

    public getCostForCompletion(): MaterialQuantity {
        return this.gachaBanner.calcCostForCompletion();
    }

    public getNbrOfPullsPossible(): number {
        const userFunds = this.currentInventory.quantity
        const cost = this.gachaBanner.pullCost.quantity;
        return _.floor(userFunds / cost, 0)
    }

    public getNbrPullsLeft(): number {
        return this.gachaBanner.calcNBPullsForBannerCompletion() - this.currentPullCount
    }

    public getNumberOfDaysForCompletionFunds(): number {
        return new MaterialQuantityCalculator(this.materialHistory, this.getRemainingCostForCompletion()).getDaysBeforeReachingQuantity()
    }

    public getPercentageAchievable(): number {
        return _.round(100 * (this.getTotalAmountOfPullsOnBanner() / this.gachaBanner.calcNBPullsForBannerCompletion()), 2)
    }

    public getRemainingCostForCompletion(): MaterialQuantity {
        const costForCompletion = this.getCostForCompletion();
        return new MaterialQuantity(
            costForCompletion.material,
            costForCompletion.quantity - (this.currentPullCount * this.pullCost.quantity)
        )
    }

    public getTotalAmountOfPullsOnBanner() {
        return this.getNbrOfPullsPossible() + this.currentPullCount;
    }
}