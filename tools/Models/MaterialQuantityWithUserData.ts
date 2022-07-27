import {MaterialWithUserData} from "./MaterialWithUserData";
import {MaterialQuantity} from "./MaterialQuantity";
import {TimeRef} from "../../utils/TimeTools";
import {LogSource} from "./MaterialLog";

/** A MaterialQuantity class with its material having logs */
export class MaterialQuantityWithUserData extends MaterialQuantity {
    readonly material: MaterialWithUserData;

    constructor(material: MaterialWithUserData, quantity: number) {
        super(material, quantity);
        this.material = material;
    }

    static addLogsToMaterialQuantity(quantity: MaterialQuantity, material: MaterialWithUserData) {
        if (!quantity.material.isSameMaterial(material)) throw new Error("The material aren't the same");

        return new MaterialQuantityWithUserData(material, quantity.quantity)
    }

    /** Check if the user has enough in game material to match the quantity. */
    public UserHasEnoughMaterials(): boolean {
        return this.material.logCollection.getCurrentCount() >= this.quantity;
    }

    /** Give the time needed before the user will obtain enough material to match the quantity.  */
    public calcTimeToMatchQuantity(timeValue: TimeRef = "days"): number {
        // Check if the quantity is already achieved
        if (this.UserHasEnoughMaterials()) return 0

        // Else, calculate the time needed
        const avgGainUntilToday = this.material.logCollection.calcAvgGainUntilToday(timeValue);
        return this.getQuantityDifferenceWithCurrent() / avgGainUntilToday;
    }

    /** Give the number of days before the user will obtain enough material to match the quantity.
     *  @deprecated
     */
    getDaysToMatchQuantity(dateFrom?: Date, dateTo?: Date): number {
        // Check if the quantity is already achieved
        if (this.UserHasEnoughMaterials()) return 0

        const currentGainsPerDay = this.material.logCollection.getAverageGainOfPeriod(dateFrom, dateTo);
        return this.getQuantityDifferenceWithCurrent() / currentGainsPerDay;
    }

    /** Give the difference between the quantity and the current funds of the user. */
    getQuantityDifferenceWithCurrent(): number {
        return this.quantity - this.material.logCollection.getCurrentCount();
    }

    /** Convert from MaterialQuantity */
    public static convertMaterialQuantity(materialQuantity: MaterialQuantity, logSource: LogSource){
        return new MaterialQuantityWithUserData(
            materialQuantity.material.addUserData(logSource),
            materialQuantity.quantity
        )
    }
}