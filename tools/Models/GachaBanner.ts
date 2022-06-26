import {MaterialQuantity} from "./MaterialQuantity";

/** An object corresponding to a gacha banner. */
export class GachaBanner {
    name: string
    nbGuarantyForCompletion: number
    nbPullsForGuaranty: number
    pullCost: MaterialQuantity

    constructor(name: string, prices: MaterialQuantity, NbPullsForGuaranty: number, NbGuarantyForCompletion: number) {
        this.name = name;
        this.pullCost = prices;
        this.nbPullsForGuaranty = NbPullsForGuaranty;
        this.nbGuarantyForCompletion = NbGuarantyForCompletion;
    }

    /** The cost of completing the banner */
    getCostToCompletion(): MaterialQuantity {
        return new MaterialQuantity(
            this.pullCost.material,
            this.pullCost.quantity * this.getNBPullsForCompletion()
        )
    }

    /** Return the number of days before the user obtain enough materials to complete the gacha */
    getDaysToFullCompletionFounds(dateFrom?: Date, dateTo?: Date): number {
        const costOfCompletion = this.getCostToCompletion();
        return Math.ceil(costOfCompletion.getDaysToMatchQuantity(dateFrom, dateTo))
    }

    /** Get the name of the material needed to gacha */
    getGetCostMaterialName(): string {
        return this.pullCost.material.name;
    }

    /** The number of pull for full banner completion */
    getNBPullsForCompletion(): number {
        return this.nbPullsForGuaranty * this.nbGuarantyForCompletion;
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

