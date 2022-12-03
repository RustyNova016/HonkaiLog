import {MaterialPurchase} from "./MaterialPurchase";

/** List the different purchasable sources of a material */
export class MaterialPurchasableSources {
    sources: MaterialPurchase[]

    constructor(sources: MaterialPurchase[]) {
        this.sources = sources;
    }

    getPurchaseCost(nbPurchases: number) {
        const possibleCosts = []

        for (const source of this.sources) {
            possibleCosts.push(source.getPurchaseCost(nbPurchases))
        }

        return possibleCosts
    }
}