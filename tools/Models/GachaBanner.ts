import {MaterialQuantity} from "./MaterialQuantity";

/** An object corresponding to a gacha banner. */
export class GachaBanner {
    name: string
    nbGuarantyForCompletion: number
    nbPullsForGuaranty: number
    pullCost: MaterialQuantity

    constructor(name: string, NbPullsForGuaranty: number, NbGuarantyForCompletion: number, pullCost: MaterialQuantity) {
        this.name = name;
        this.pullCost = pullCost;
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

    /** Get the name of the material needed to gacha */
    getGetCostMaterialName(): string {
        return this.pullCost.material.name;
    }

    /** The number of pull for full banner completion */
    getNBPullsForCompletion(): number {
        return this.nbPullsForGuaranty * this.nbGuarantyForCompletion;
    }
}