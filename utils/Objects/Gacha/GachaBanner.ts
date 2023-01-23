import {MaterialQuantity, MaterialQuantityInterface} from "@/utils/Objects/Material/MaterialQuantity";
import {GachaBannerJSON} from "@/lib/Zod/Validations/GachaBannerJSONZod";

/** An object corresponding to a gacha banner. */
export class GachaBanner {
    /** Name of the banner */
    name: string

    /** The number of guaranties to complete the banner */
    nbGuarantyForCompletion: number

    /** The number of pull to do before hitting pity */
    nbPullsForGuaranty: number

    /** Cost to pull the gacha */
    pullCost: MaterialQuantity

    constructor(name: string, NbPullsForGuaranty: number, NbGuarantyForCompletion: number, pullCost: MaterialQuantity) {
        this.name = name;
        this.pullCost = pullCost;
        this.nbPullsForGuaranty = NbPullsForGuaranty;
        this.nbGuarantyForCompletion = NbGuarantyForCompletion;
    }

    public static parse(data: GachaBannerJSON): GachaBanner {
        return new GachaBanner(
            data.name,
            data.nbPullsForGuaranty,
            data.nbGuarantiesForBannerCompletion,
            MaterialQuantity.parse(data.pullCost)
        )
    }

    /** The cost for completing the banner */
    public calcCostForCompletion(): MaterialQuantity {
        return new MaterialQuantity(this.pullCost.material, this.pullCost.quantity * this.calcNBPullsForBannerCompletion())
    }

    /** The number of pull for full banner completion */
    public calcNBPullsForBannerCompletion(): number {
        return this.nbPullsForGuaranty * this.nbGuarantyForCompletion;
    }

    public export(): GachaBannerJSON {
        return {
            name: this.name,
            nbPullsForGuaranty: this.nbPullsForGuaranty,
            nbGuarantiesForBannerCompletion: this.nbGuarantyForCompletion,
            pullCost: this.pullCost.toJSON()
        }
    }
}

