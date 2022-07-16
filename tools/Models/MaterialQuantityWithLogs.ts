import {MaterialWithLogs} from "./MaterialWithLogs";
import {MaterialQuantity} from "./MaterialQuantity";

/** A MaterialQuantity class with its material having logs */
export class MaterialQuantityWithLogs extends MaterialQuantity {
    readonly material: MaterialWithLogs;

    constructor(material: MaterialWithLogs, quantity: number) {
        super(material, quantity);
        this.material = material;
    }

    /** Check if the user has enough in game material to match the quantity. */
    public UserHasEnoughMaterials(): boolean {
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

    static addLogsToMaterialQuantity(quantity: MaterialQuantity, material: MaterialWithLogs) {
        if (!quantity.material.isSameMaterial(material)) throw new Error("The material aren't the same");

        return new MaterialQuantityWithLogs(material, quantity.quantity)
    }
}