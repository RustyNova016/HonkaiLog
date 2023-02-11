import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";
import _ from "lodash";

export class MaterialQuantityCalculator {
    currentQuantity: number;
    history: MaterialHistoryCalculator;
    targetQuantity: number

    constructor(materialHistoryCalculator: MaterialHistoryCalculator, currentQuantity: number, targetQuantity: number) {
        this.history = materialHistoryCalculator;
        this.currentQuantity = currentQuantity;
        this.targetQuantity = targetQuantity;
    }

    public getDaysBeforeReachingQuantity(): number {
        if (this.hasEnough()) {return 0}

        const materialPerDay = this.history.calcAvgGain()

        return _.ceil(this.getQuantityDifference() / materialPerDay, 0)
    }

    public getQuantityDifference() {
        return this.targetQuantity - this.currentQuantity;
    }

    private hasEnough() {
        return this.targetQuantity === this.currentQuantity;
    }
}