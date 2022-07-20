import {GachaBanner} from "./GachaBanner";
import {MaterialQuantityWithLogs} from "./MaterialQuantityWithLogs";

/** A GachaBanner with access to the logs of the user for analytics  */
export class GachaBannerWithLogs extends GachaBanner {
    pullCost: MaterialQuantityWithLogs

    constructor(name: string, NbPullsForGuaranty: number, NbGuarantyForCompletion: number, pullCost: MaterialQuantityWithLogs) {
        super(name, NbPullsForGuaranty, NbGuarantyForCompletion, pullCost);
        this.pullCost = pullCost;
    }

    /** Return the number of days before the user obtain enough materials to complete the gacha */
    getDaysToFullCompletionFounds(dateFrom?: Date, dateTo?: Date): number {
        const costOfCompletion = this.getCostToCompletion().addLogsFrom(this.pullCost.material);
        return Math.ceil(costOfCompletion.getDaysToMatchQuantity(dateFrom, dateTo))
    }

    /** The number of pulls possible with the current count of materials */
    getNBPullsPossible(): number {
        return Math.trunc(this.pullCost.material.getInGameCount() / this.pullCost.quantity);
    }

    /** Percentage of the banner capable to be done */
    getPercentageAchievable(): number {
        return 100 * (this.getNBPullsPossible() / this.getNBPullsForCompletion())
    }
}