import {toPascalCase} from "@/utils/functions/ToPascalCase";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {MaterialRecipeJSON} from "@/utils/types/materials/MaterialInfo";
import {MaterialDataTable} from "@/utils/ORMEntities/Materials/MaterialDataTable";


export class MaterialRecipe {
    public id; //TODO: Make fix id
    materialProduced: MaterialInventory;
    materialsRequired: MaterialInventory;

    constructor(materialsRequired: MaterialInventory, materialProduced: MaterialInventory, public name: string = "") {
        this.materialsRequired = materialsRequired;
        this.materialProduced = materialProduced;
        this.id = toPascalCase(this.name)
    }

    get consumedMaterials() {
        return this.materialsRequired.map(matQuantity => matQuantity.id)
    }

    /*get materialsRequiredWithoutTime() {
        return this.materialsRequired.deepClone().add({idMaterial: "Time", quantity: 0});
    }*/

    public static fromJSON(data: MaterialRecipeJSON, materialTable: MaterialDataTable | undefined = undefined) {
        return new MaterialRecipe(
            new MaterialInventory(materialTable).insertMultipleFromJSON(data.require),
            new MaterialInventory(materialTable).insertMultipleFromJSON(data.produce),
            data.name
        );
    }

    /*public static fromMaterialQuantity(costQuantities: MaterialQuantityType[], productionQuantity: MaterialQuantityType[]) {
       return new MaterialRecipe(new MaterialInventory().addMultiple(costQuantities), new MaterialInventory().addMultiple(productionQuantity));
   }*/

    /*public getCostForMaterialQuantity(finalInventory: MaterialInventory) {
        const finalCost = new MaterialInventory();
        const currentInventory = new MaterialInventory();

        while (!currentInventory.isEachMaterialSuperiorOrEdualTo(finalInventory)) {
            finalCost.addToInventory(this.materialsRequired);
            currentInventory.addToInventory(this.materialProduced);
        }

        return {
            finalCost: finalCost,
            actualProduction: currentInventory,
        };
    }

    public getCostForOneMaterial(idMaterial: string) {
        const materialProduced = this.materialProduced.get(idMaterial);
        if (materialProduced.quantity === 1) {
            return this.materialsRequired;
        }

        return this.materialsRequired.deepClone().applyToEach((value) => {
            return {
                idMaterial: value.idMaterial,
                quantity: value.quantity / materialProduced.quantity
            };
        });
    }

    public hasEnoughToProduce(items: MaterialInventory): boolean {
        return items.isEachMaterialSuperiorOrEdualTo(this.materialsRequiredWithoutTime);
    }*/

    public canProduceMaterial(idMaterial: string) {
        for (const idMaterialProduced of this.materialProduced.toKeyArray()) {
            if (idMaterial === idMaterialProduced) {
                return true;
            }
        }
        return false;
    }

    /** Use recipe on the inventory */
    public produceOne(currentInventory: MaterialInventory) {
        return currentInventory.removeInventory(this.materialsRequired).addInventory(this.materialProduced);
    }

    /*    public recipeCanCraftOneOfTheItems(inv: MaterialInventory): boolean {
            for (const idMaterialProduceed of this.materialProduced.toKeyArray()) {
                for (const idMaterialNeeded of inv.toKeyArray()) {
                    if (idMaterialNeeded === idMaterialProduceed) {
                        return true;
                    }
                }
            }
            return false;
        }*/

    /** Reverse use recipe on the inventory */
    public unCraft(currentInventory: MaterialInventory) {
        return currentInventory.removeInventory(this.materialProduced).addInventory(this.materialsRequired);
    }
}

