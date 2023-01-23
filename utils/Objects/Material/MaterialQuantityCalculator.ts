import {MaterialHistory} from "@/utils/Objects/Material/MaterialHistory";
import {MaterialQuantity} from "@/utils/Objects/Material/MaterialQuantity";
import {MaterialLogCollection} from "@/utils/Objects/Material/MaterialLogCollection";
import {MaterialHistoryCalculator} from "@/utils/Objects/Material/MaterialHistoryCalculator";
import _ from "lodash";

export class MaterialQuantityCalculator {
    materialHistoryCalculator: MaterialHistoryCalculator;
    materialQuantity: MaterialQuantity;


    constructor(materialHistory: MaterialHistory, materialQuantity: MaterialQuantity) {
        this.materialHistoryCalculator = new MaterialHistoryCalculator(materialHistory);
        this.materialQuantity = materialQuantity;
    }

    public getDaysBeforeReachingQuantity(): number {
        if(this.hasEnough()) {return 0}

        const materialPerDay = this.materialHistoryCalculator.calcAvgGain()

        return _.ceil(this.getQuantityDifference() / materialPerDay, 0)
    }

    public getQuantityDifference() {
        return this.wantedQuantity - this.currentCount;
    }

    private hasEnough() {
        return this.wantedQuantity === this.currentCount;
    }

    get currentCount() {
        return this.materialHistory.logCollection.getCurrentCount();
    }

    get materialHistory() {
        return this.materialHistoryCalculator.materialHistory;
    }

    get wantedQuantity() {
        return this.materialQuantity.quantity;
    }
}