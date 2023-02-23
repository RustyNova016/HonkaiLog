import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {ProductionStepType} from "@/utils/entities/Material/Recipes/ProductionStep";


export class MaterialRecipe {
    materialProduced: MaterialInventory;
    materialsRequired: MaterialInventory;

    constructor(materialsRequired: MaterialInventory, materialProduced: MaterialInventory) {
        this.materialsRequired = materialsRequired;
        this.materialProduced = materialProduced;
    }

    public getCostForMaterialQuantity(finalInventory: MaterialInventory) {
        const finalCost = new MaterialInventory();
        const currentInventory = new MaterialInventory();

        while (!currentInventory.hasMoreMaterialsThan(finalInventory)) {
            finalCost.addToInventory(this.materialsRequired);
            currentInventory.addToInventory(this.materialProduced);
        }

        return {
            finalCost: finalCost,
            actualProduction: currentInventory,
        };
    }

    /* public getBestOfTwo(otherRecipe: MaterialRecipe, filtersLeastCostOf: string[] = []) {
        for (const idMaterial of filtersLeastCostOf) {

        }
    } */

    public getCostForOneMaterial(idMaterial: string) {
        const materialProduced = this.materialProduced.get(idMaterial);
        if (materialProduced.quantity === 1) {return this.materialsRequired;}

        return this.materialsRequired.clone().applyToEach((value) => {
            return {
                idMaterial: value.idMaterial,
                quantity: value.quantity / materialProduced.quantity
            };
        });
    }

    public produceOne(currentInventory: MaterialInventory, currentCost: MaterialInventory = new MaterialInventory()): ProductionStepType | undefined {
        if (!currentInventory.hasMoreMaterialsThan(this.materialsRequired)) {return;}

        return {
            current: {
                inventory: currentInventory.removeFromInventory(this.materialsRequired).addToInventory(this.materialProduced),
                cost: currentCost.addToInventory(this.materialsRequired).removeFromInventory(this.materialProduced, true).makeNegativesZero(),
                recipe: this
            }
        };
    }
}

