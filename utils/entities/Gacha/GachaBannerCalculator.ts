import {MaterialIdMap} from "@/utils/classes/MaterialIdMap";
import {GachaBannerState} from "@/utils/entities/Gacha/GachaBannerState";
import {GachaCost} from "@/utils/entities/Gacha/GachaCost";
import {MaterialHistoryCollection} from "@/utils/entities/Material/history/MaterialHistoryCollection";
import {Material} from "@/utils/entities/Material/Material";
import {MaterialQuantity, MaterialQuantityType} from "@/utils/entities/Material/MaterialQuantity";
import {MaterialQuantityCalculator} from "@/utils/entities/Material/MaterialQuantityCalculator";
import _ from "lodash";


export class GachaBannerCalculator {
    gachaBanner: GachaBannerState;
    histories: MaterialHistoryCollection;
    inventory = new MaterialIdMap<MaterialQuantityType>();

    constructor(gachaBanner: GachaBannerState, histories: MaterialHistoryCollection, inventory: MaterialIdMap<MaterialQuantityType> | undefined = undefined) {
        this.gachaBanner = gachaBanner;
        this.histories = histories;
        inventory === undefined ? this.setInventoryFromCurrentCounts() : this.inventory = inventory;
    }

    get bannerAfterSpending() {
        return new GachaBannerState(
            this.gachaBanner.banner,
            this.gachaBanner.pullCount + this.getInventoryPullCount()
        );
    }

    get bannerType() {
        return this.gachaBanner.banner;
    }

    /** Set the pull count by giving the current pity counter */
    set currentPityCounter(count: number) {
        this.pullCountOnCurrentGuaranty = this.gachaBanner.nbPullsForGuaranty - count;
    }

    /** Number of pulls left to do currently */
    get currentRemainingPullCount(): number {
        return this.gachaBanner.nbPullsForCompletion - this.currentTotalPullCount;
    }

    /** Total number of pulls the user made on this banner */
    get currentTotalPullCount(): number {
        return this.pullCountOnCurrentGuaranty + (this.nbGarranties * this.gachaBanner.nbPullsForGuaranty);
    }

    /** Number of pulls left to do after spending the inventory */
    get missingPullCount(): number {
        return this.gachaBanner.nbPullsForCompletion - this.possibleTotalPullCount;
    }

    /** Total number of pulls the user can make on this banner */
    get possibleTotalPullCount(): number {
        return this.currentTotalPullCount + this.getInventoryPullCount();
    }

    get pullCosts() {
        return this.gachaBanner.possibleCosts;
    }

    public canCompleteTheBanner(): boolean {
        return this.getInventoryPullCount() > this.getNbrPullsLeft();
    }

    /** The number of pulls the inventory can provide */
    public getInventoryPullCount(): number {
        return this.nbOfPullsPerMaterials()
            .toValueArray()
            .map((value) => value.quantity)
            .reduce((previousQuantity, currentValue) => previousQuantity + currentValue);
    }

    /** Return the remaining inventory after completing the banner */
    public getLeftoverInventory(): MaterialQuantity {
        const costOfCompletion = this.getTotalCompletionCostPerMaterial();

        for (const materialQuantity of this.inventory.toValueArray()) {

        }


        let quantity = this.pullCosts.quantity - this.getMissingCostForCompletion().quantity;
        if (quantity < 0) {
            quantity = 0;
        }

        return new MaterialQuantity(
            this.pullCosts.material,
            quantity
        );
    }

    getMainCostMaterial(): Material {
        return this.histories.getOrThrow(this.gachaBanner.mainCost.idMaterial).material;
    }

    /** Get the remaining count of main material needed to complete the gacha */
    public getMissingCostForCompletion(): MaterialQuantityType {
        const pullsLeftToDo = this.missingPullCount;
        const quantity = this.gachaBanner.mainCost.getRemainingCostOfCompletion(pullsLeftToDo);
        return {quantity: quantity >= 0 ? quantity : 0, idMaterial: this.getMainCostMaterial().id};
    }

    /** Number of pulls left to complete the banner without counting the inventory */
    public getNbrPullsLeft(): number {
        return this.gachaBanner.calcNBPullsForBannerCompletion() - this.pullCountOnCurrentGuaranty;
    }

    public getNumberOfBannerCompletable(): number {
        if (!this.canCompleteTheBanner()) {
            return 0;
        }

        const remainingInventory = this.getLeftoverInventory();

        return new GachaBannerCalculator(this.gachaBanner, this.histories, remainingInventory, 0, 0).getNumberOfBannerCompletable() + 1;
    }

    /** @deprecated */
    public getNumberOfDaysForCompletionFunds(): number {
        return new MaterialQuantityCalculator(this.historyCalculator, this.inventory.quantity, this.getMissingCostForCompletion().quantity).getDaysBeforeReachingQuantity();
    }

    /** Percent of the banner achievable */
    public getPercentageAchievable(): number {
        return _.floor(100 * (this.bannerAfterSpending.pullCount / this.bannerType.calcNBPullsForBannerCompletion()), 2);
    }

    /** Return the amount of pulls done after spending everything */
    public getPossibleTotalPullCount() {
        const numberOfPullsMade = this.pullCountOnCurrentGuaranty + (this.nbGarranties * this.gachaBanner.nbPullsForGuaranty);
        return this.getInventoryPullCount() + numberOfPullsMade;
    }

    /** Get the quantity spent per material to complete the banner. */
    public getQuantitySpentPerMaterial(): MaterialIdMap<MaterialQuantityType> {
        return new MaterialIdMap<MaterialQuantityType>().addMultiple(
            this.gachaBanner.possibleCosts.map(
                (gachaCost: GachaCost): MaterialQuantityType => {
                    const materialStock = this.inventory.get(gachaCost.idMaterial);
                    if (materialStock === undefined) {
                        return {idMaterial: gachaCost.idMaterial, quantity: 0};
                    }

                    let quantity = _.min([gachaCost.getTotalCostOfCompletion(), materialStock.quantity]);
                    if (quantity === undefined) {
                        quantity = 0;
                    }

                    return {
                        idMaterial: gachaCost.idMaterial,
                        quantity: quantity
                    };
                }
            )
        );
    }

    /** Get the cost of materials needed to complete the banner */
    public getRemainingCostForCompletion(): MaterialIdMap<MaterialQuantityType> {
        const out = new MaterialIdMap<MaterialQuantityType>();
        let pullsLeftToDo = this.getNbrPullsLeft();

        for (const gachaCost of this.gachaBanner.possibleCosts.toValueArray()) {
            out.add({
                idMaterial: gachaCost.idMaterial,
                quantity: _.min(gachaCost)
            });
        }
    }

    /** Return the number of each material individually needed to complete the banner.  */
    public getTotalCompletionCostPerMaterial(): MaterialIdMap<MaterialQuantityType> {
        return new MaterialIdMap<MaterialQuantityType>().addMultiple(
            this.gachaBanner.possibleCosts.map(
                (gachaCost: GachaCost): MaterialQuantityType => {
                    return {idMaterial: gachaCost.idMaterial, quantity: gachaCost.getTotalCostOfCompletion()};
                }
            )
        );
    }

    /** Get the total cost of the banner */
    public getTotalCostOfCompletion(): MaterialQuantityType {
        return this.gachaBanner.calcCostForCompletion();
    }

    public nbOfPullsPerMaterials(): MaterialIdMap<MaterialQuantityType> {
        const possiblePullsPerMaterial = this.inventory.map<MaterialQuantityType>((materialStock) => {
            return {
                idMaterial: materialStock.idMaterial,
                quantity: this.gachaBanner.possibleCosts.getOrThrow(materialStock.idMaterial).getPossiblePullCount(materialStock.quantity)
            };
        });
        return new MaterialIdMap<MaterialQuantityType>().addMultiple(possiblePullsPerMaterial);
    }

    private setInventoryFromCurrentCounts() {
        this.inventory = new MaterialIdMap<MaterialQuantityType>();
        this.gachaBanner.possibleCosts.forEach(value => this.inventory.add(
                {
                    idMaterial: value.idMaterial,
                    quantity: this.histories.getOrThrow(value.idMaterial).getCalculator().getCurrentCount()
                }
            )
        );
    }
}