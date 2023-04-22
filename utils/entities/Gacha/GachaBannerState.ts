import {MaterialIdMap} from "@/utils/classes/MaterialIdMap";
import {GachaBanner} from "@/utils/entities/Gacha/GachaBanner";
import {MaterialQuantityType} from "@/utils/entities/Material/MaterialQuantity";
import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";

export class GachaBannerState {
    public banner: GachaBanner;
    inventory = new MaterialIdMap<MaterialQuantityType>();

    constructor(banner: GachaBanner, pullCount: number = 0, inventory: MaterialIdMap<MaterialQuantityType> | undefined = undefined) {
        this.banner = banner;
        this.pullCount = pullCount;
        if (inventory !== undefined) {this.inventory = inventory;}
    }

    private _pullCount: number = 0;

    public get pullCount(): number {
        return this._pullCount;
    }

    set pullCount(pullCount: number) {
        if (pullCount > this.banner.nbPullsForCompletion) {
            pullCount = this.banner.nbPullsForCompletion;
        }
        if (pullCount < 0) {
            pullCount = 0;
        }

        this._pullCount = pullCount;
    }

    get guarantyCount(): number {
        return this.pullCount % this.banner.nbPullsForGuaranty;
    }

    set guarantyCount(guarantyCount: number) {
        this.pullCount = (this.banner.nbPullsForGuaranty * guarantyCount) + this.pullCountOfCurrentGuaranty;
    }

    get pullCountOfCurrentGuaranty(): number {
        return this.pullCount - (this.banner.nbPullsForGuaranty * this.guarantyCount);
    }

    set pullCountOfCurrentGuaranty(pullCount: number) {
        this.pullCount = (this.banner.nbPullsForGuaranty * this.guarantyCount) + pullCount;
    }

    get remainingPullCount(): number {
        return this.banner.nbPullsForCompletion - this.pullCount;
    }

    /** Cost of the remaining pulls */
    public getRemainingCost(): MaterialInventory {
        const costs = new MaterialInventory();
        let remainingPulls: number = this.remainingPullCount

        for (const gachaCost of this.banner.possibleCosts.toValueArray()) {
            const cost = gachaCost.getCostOfPullCount(remainingPulls);
            const currentQuantity: number = this.inventory.getOrThrow(gachaCost.idMaterial).quantity;

            // If there's more cost than available
            if(cost > currentQuantity) {
                remainingPulls = remainingPulls - gachaCost.getPossiblePullCount()
            }


        }
    }
}