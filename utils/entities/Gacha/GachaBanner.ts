import {MaterialQuantityType} from "@/utils/entities/Material/MaterialQuantity";
import {GachaBannerJSON} from "@/lib/Zod/Validations/GachaBannerJSONZod";
import {GachaCost, GachaCostInterface} from "@/utils/entities/Gacha/GachaCost";
import {MaterialIdMap} from "@/utils/classes/MaterialIdMap";

/** An object corresponding to a gacha banner. */
export class GachaBanner {
    /** Name of the banner */
    name: string

    /** The number of guaranties to complete the banner */
    nbGuarantyForCompletion: number

    /** The number of pull to do before hitting pity */
    nbPullsForGuaranty: number

    /** Cost to pull the gacha */
    possibleCosts = new MaterialIdMap<GachaCost>()

    constructor(name: string, NbPullsForGuaranty: number, NbGuarantyForCompletion: number) {
        this.name = name;
        this.nbPullsForGuaranty = NbPullsForGuaranty;
        this.nbGuarantyForCompletion = NbGuarantyForCompletion;
    }

    /** Number of pulls to complete the banner */
    get nbPullsForCompletion(): number {
        return this.nbPullsForGuaranty * this.nbGuarantyForCompletion;
    }

    public addCost(data: GachaCostInterface) {
        this.possibleCosts.add(new GachaCost(data.idMaterial, data.cost, data.isMainCurrency, this))
        return this
    }

    /** The cost for completing the banner */
    public calcCostForCompletion(): MaterialQuantityType[] {
        return this.possibleCosts.map(value => {
            return {
                idMaterial: value.idMaterial,
                quantity: value.getTotalCostOfCompletion()
            }
        })
    }

    /** The number of pull for full banner completion */
    public calcNBPullsForBannerCompletion(): number {
        return this.nbPullsForGuaranty * this.nbGuarantyForCompletion;
    }

    //TODO: Remove
    public export(): GachaBannerJSON {
        return {
            name: this.name,
            nbPullsForGuaranty: this.nbPullsForGuaranty,
            nbGuarantiesForBannerCompletion: this.nbGuarantyForCompletion,
            pullCost: this.possibleCosts.toJSON()
        }
    }

    get mainCost() {
        for (const possibleCost of this.possibleCosts.toValueArray()) {
            if (possibleCost.isMainCurrency) {return possibleCost}
        }

        throw new Error("No main currency is set for banner: " + this.name)
    }
}

