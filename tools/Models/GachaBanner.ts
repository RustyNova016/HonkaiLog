import {MaterialQuantity} from "./MaterialQuantity";

export class GachaBanner {
    name: string
    price: MaterialQuantity
    nbPullsForGuaranty: number
    nbGuarantyForCompletion: number

    constructor(name: string, prices: MaterialQuantity, NbPullsForGuaranty: number, NbGuarantyForCompletion: number) {
        this.name = name;
        this.price = prices;
        this.nbPullsForGuaranty = NbPullsForGuaranty;
        this.nbGuarantyForCompletion = NbGuarantyForCompletion;
    }

    /** The number of pull for full banner completion */
    getNBPullsForCompletion(): number {
        return this.nbPullsForGuaranty * this.nbGuarantyForCompletion;
    }

    /** The cost of completing the banner */
    getCostToCompletion(): MaterialQuantity {
        return new MaterialQuantity(
            this.price.material,
            this.price.quantity * this.getNBPullsForCompletion()
        )
    }

    /** Percentage of the banner capable to be done */
    getPercentageAchievable(): number {

    }
}

