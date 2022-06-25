import {MaterialQuantity} from "./MaterialQuantity";

/** An object corresponding to a gacha banner. */
export class GachaBanner {
    name: string
    nbGuarantyForCompletion: number
    nbPullsForGuaranty: number
    price: MaterialQuantity

    constructor(name: string, prices: MaterialQuantity, NbPullsForGuaranty: number, NbGuarantyForCompletion: number) {
        this.name = name;
        this.price = prices;
        this.nbPullsForGuaranty = NbPullsForGuaranty;
        this.nbGuarantyForCompletion = NbGuarantyForCompletion;
    }

    /** The cost of completing the banner */
    getCostToCompletion(): MaterialQuantity {
        return new MaterialQuantity(
            this.price.material,
            this.price.quantity * this.getNBPullsForCompletion()
        )
    }

    /** The number of pull for full banner completion */
    getNBPullsForCompletion(): number {
        return this.nbPullsForGuaranty * this.nbGuarantyForCompletion;
    }

    /** The number of pulls possible with the current count of materials */
    getNBPullsPossible(): number {
        return Math.trunc(this.price.material.getInGameCount() / this.price.quantity);
    }

    /** Percentage of the banner capable to be done */
    getPercentageAchievable(): number {
        return 100 * (this.getNBPullsPossible() / this.getNBPullsForCompletion())
    }
}

