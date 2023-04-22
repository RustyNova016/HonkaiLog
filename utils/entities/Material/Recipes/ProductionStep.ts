import {MaterialQuantityType} from "@/utils/entities/Material/MaterialQuantity";
import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";

export type ProductionStepType = {
    current: {
        inventory: MaterialInventory,
        cost: MaterialInventory,
        recipe?: MaterialRecipe
    },
    previous?: ProductionStepType | undefined
}

export type RecipeStepState = { inventory: MaterialInventory; requireMaterials: MaterialInventory }
export type CurrentProductionStep = RecipeStepState & { recipe?: MaterialRecipe | undefined };

export class ProductionStep implements ProductionStepType {
    public current: CurrentProductionStep;
    public previous: ProductionStep | undefined;

    constructor(current: CurrentProductionStep, previous: ProductionStep|undefined = undefined) {
        this.current = current;
        this.previous = previous;
    }

    public hasStepReachedQuantity(targetQuantity: MaterialQuantityType) {
        return this.current.inventory.get(targetQuantity.idMaterial).quantity >= targetQuantity.quantity;
    }
}