import {MaterialQuantityType} from "@/utils/entities/Material/MaterialQuantity";
import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {MaterialRecipe} from "@/utils/entities/Material/Recipes/MaterialRecipe";

export type ProductionStepType = {
    current: {
        inventory: MaterialInventory,
        cost: MaterialInventory,
        recipe?: MaterialRecipe
    },
    previous?: ProductionStepType | undefined
}

export class ProductionStep implements ProductionStepType {
    public current: { inventory: MaterialInventory; cost: MaterialInventory; recipe?: MaterialRecipe };
    public previous: ProductionStep | undefined;

    constructor(current: {
        inventory: MaterialInventory;
        cost: MaterialInventory;
        recipe?: MaterialRecipe
    }, previous: ProductionStep|undefined = undefined) {
        this.current = current;
        this.previous = previous;
    }

    public hasStepReachedQuantity(targetQuantity: MaterialQuantityType) {
        return this.current.inventory.get(targetQuantity.idMaterial).quantity >= targetQuantity.quantity;
    }
}