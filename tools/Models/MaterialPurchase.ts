import {MaterialQuantity} from "./MaterialQuantity";

/** Class of a purchase in the shop */
export class MaterialPurchase {
    itemCost: MaterialQuantity[]

    constructor(itemCost: MaterialQuantity[]) {
        this.itemCost = itemCost;
    }

    getPurchaseCost(nbPurchases: number): MaterialQuantity[] {
        const finalCost: MaterialQuantity[] = []

        for (const materialQuantity of this.itemCost) {
            materialQuantity.quantity *= nbPurchases
            finalCost.push(materialQuantity)
        }

        return finalCost
    }
}

