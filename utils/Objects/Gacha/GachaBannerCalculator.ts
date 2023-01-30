import {MaterialQuantity, MaterialQuantityInterface} from "@/utils/Objects/Material/MaterialQuantity";
import _ from "lodash";
import {GachaBanner} from "./GachaBanner";
import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {MaterialQuantityCalculator} from "@/utils/Objects/Material/MaterialQuantityCalculator";
import {Material} from "@/utils/Objects/Material/Material";
import {MaterialHistoryCalculator} from "@/utils/Objects/Material/MaterialHistoryCalculator";


export class GachaBannerCalculator {
    currentCompletion: number;
    currentInventory: MaterialQuantityInterface;
    currentPullCount: number;
    gachaBanner: GachaBanner;
    materialHistory: MaterialHistory;

    constructor(gachaBanner: GachaBanner, currentInventory: MaterialQuantityInterface, materialHistory: MaterialHistory, currentPullCount: number = 0, currentCompletion: number = 0) {
        this.gachaBanner = gachaBanner;
        this.currentInventory = currentInventory;
        this.materialHistory = materialHistory;
        this.currentPullCount = currentPullCount;
        this.currentCompletion = currentCompletion;
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

    public getNbrOfPullsPossible(): number {
        const userFunds = this.currentInventory.quantity
        const cost = this.gachaBanner.pullCost.quantity;
        return _.floor(userFunds / cost, 0)
    }

    public getNbrPullsLeft(): number {
        return this.gachaBanner.calcNBPullsForBannerCompletion() - this.currentPullCount
    }

    public getNumberOfDaysForCompletionFunds(): number {
        return new MaterialQuantityCalculator(new MaterialHistoryCalculator(this.materialHistory), this.currentInventory.quantity, this.getRemainingCostForCompletion().quantity).getDaysBeforeReachingQuantity()
    }

    public getPercentageAchievable(): number {
        return _.round(100 * (this.getTotalAmountOfPullsOnBanner() / this.gachaBanner.calcNBPullsForBannerCompletion()), 2)
    }

    public getRemainingCostForCompletion(): MaterialQuantity {
        const costForCompletion = this.getTotalCostOfCompletion();
        return new MaterialQuantity(
            costForCompletion.material,
            costForCompletion.quantity - (this.getTotalAmountOfPullsOnBanner()  * this.pullCost.quantity)
        )
    }

    public getTotalAmountOfPullsOnBanner() {
        const numberOfPullsMade = this.currentPullCount + (this.currentCompletion * this.gachaBanner.nbPullsForGuaranty);
        return this.getNbrOfPullsPossible() + numberOfPullsMade;
    }

    /** Get the total cost of the banner */
    public getTotalCostOfCompletion(): MaterialQuantity {
        return this.gachaBanner.calcCostForCompletion();
    }

    public getRemainingInventory(): MaterialQuantity {
        let quantity = this.pullCost.quantity - this.getRemainingCostForCompletion().quantity;
        if (quantity < 0) {quantity = 0}

        return new MaterialQuantity(
            this.pullCost.material,
            quantity
        )
    }
}