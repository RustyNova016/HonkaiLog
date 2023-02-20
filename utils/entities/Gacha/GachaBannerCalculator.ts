import {MaterialQuantity, MaterialQuantityInterface} from "@/utils/entities/Material/MaterialQuantity";
import _ from "lodash";
import {GachaBanner} from "./GachaBanner";
import {MaterialQuantityCalculator} from "@/utils/entities/Material/MaterialQuantityCalculator";
import {Material} from "@/utils/entities/Material/Material";
import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";
import {MaterialHistoryCollection} from "@/utils/entities/Material/history/MaterialHistoryCollection";


export class GachaBannerCalculator {
    currentCompletion: number;
    currentInventory: MaterialQuantityInterface;
    currentPullCount: number;
    gachaBanner: GachaBanner;
    historyCalculator: MaterialHistoryCalculator;

    constructor(gachaBanner: GachaBanner, historyCalculator: MaterialHistoryCalculator, currentInventory: MaterialQuantityInterface, currentPullCount: number = 0, currentCompletion: number = 0) {
        this.gachaBanner = gachaBanner;
        this.currentInventory = currentInventory;
        this.currentPullCount = currentPullCount;
        this.currentCompletion = currentCompletion;
        this.historyCalculator = historyCalculator
    }

    get material(): Material {
        return this.historyCalculator.material;
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
        return new MaterialQuantityCalculator(this.historyCalculator, this.currentInventory.quantity, this.getRemainingCostForCompletion().quantity).getDaysBeforeReachingQuantity()
    }

    public getPercentageAchievable(): number {
        return _.round(100 * (this.getTotalAmountOfPullsOnBanner() / this.gachaBanner.calcNBPullsForBannerCompletion()), 2)
    }

    public getRemainingCostForCompletion(): MaterialQuantity {
        const costForCompletion = this.getTotalCostOfCompletion();
        return new MaterialQuantity(
            costForCompletion.material,
            costForCompletion.quantity - (this.getTotalAmountOfPullsOnBanner() * this.pullCost.quantity)
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
        if (quantity < 0) {
            quantity = 0
        }

        return new MaterialQuantity(
            this.pullCost.material,
            quantity
        )
    }

    public static getCalculator(bannerData: GachaBanner, histories: MaterialHistoryCollection): GachaBannerCalculator {
        return GachaBannerCalculator(

        )
    }
}