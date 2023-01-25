import {MaterialQuantity} from "@/utils/Objects/Material/MaterialQuantity";

export class GachaGuaranty {
    public numberOfPullsNeeded: number;
    public pullCost: MaterialQuantity

    constructor(numberOfPullsNeeded: number, pullCost: MaterialQuantity) {
        this.numberOfPullsNeeded = numberOfPullsNeeded;
        this.pullCost = pullCost;
    }

    public getCostOfGuaranty(): MaterialQuantity {
        return new MaterialQuantity(
            this.pullCost.material,
            this.pullCost.quantity * this.numberOfPullsNeeded
        )
    }
}