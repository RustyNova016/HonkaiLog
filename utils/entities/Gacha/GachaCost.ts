import {GachaBanner} from "@/utils/entities/Gacha/GachaBanner";
import _ from "lodash";


export interface GachaCostInterface {
    cost: number;
    idMaterial: string;
    isMainCurrency: boolean;
}

export class GachaCost implements GachaCostInterface {
    banner: GachaBanner;
    cost: number;
    idMaterial: string;
    isMainCurrency: boolean;

    constructor(idMaterial: string, quantity: number, isMainCurrency: boolean, banner: GachaBanner) {
        this.idMaterial = idMaterial;
        this.cost = quantity;
        this.isMainCurrency = isMainCurrency;
        this.banner = banner;
    }

    getCostOfGuarranty(): number {
        return this.cost * this.banner.nbPullsForGuaranty;
    }

    /** How many pulls can you make with a given quantity  */
    getPossiblePullCount(quantity: number) {
        return _.floor(_.divide(quantity, this.cost));
    }

    /** How many of this material is needed to get that many pulls */
    getCostOfPullCount(nbPulls: number): number {
        return this.cost * nbPulls;
    }

    /** How many of this material is needed to complete the banner from an already partially completed state */
    getRemainingCostOfCompletion(nbPullsLeft): number {
        return this.cost * nbPullsLeft;
    }

    /** How many of this material is needed to complete the banner from 0 */
    getTotalCostOfCompletion(): number {
        return this.cost * this.banner.nbPullsForCompletion;
    }
}