import {Material} from "./Material";

/** A class that represent a quantity of materials. Like a stack of items */
export class MaterialQuantity {
    readonly material: Material;
    quantity: number;

    constructor(material: Material, quantity: number) {
        this.material = material;
        this.quantity = quantity;
    }

    /** Check if the user has enough in game material to match the quantity. */
    UserHasEnoughMaterials(): boolean {
        return this.material.getInGameCount() >= this.quantity;
    }

    /** Give the number of days before the user will obtain enough material to match the quantity. */
    getDaysToMatchQuantity(dateFrom?: Date, dateTo?: Date): number {
        // Check if the quantity is already achieved
        if (this.UserHasEnoughMaterials()) return 0

        const currentGainsPerDay = this.material.logs.getAverageGainOfPeriod(dateFrom, dateTo);
        return this.getQuantityDifferenceWithCurrent() / currentGainsPerDay;
    }

    /** Give the difference between the quantity and the current funds of the user. */
    getQuantityDifferenceWithCurrent(): number {
        return this.quantity - this.material.getInGameCount();
    }
}