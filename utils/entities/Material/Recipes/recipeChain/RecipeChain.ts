
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {InventoryOfItemWithId} from "@/utils/classes/ValueQuantities/InventoryOfItemWithId";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";

/** A chain of recipes to get an inventory */
export class RecipeChain extends InventoryOfItemWithId<MaterialRecipe> {
    public applyToInventory(inventory: MaterialInventory) {
        for (const recipe of this.toValueArray()) {
            inventory = recipe.getValueOrthrow().produceOne(inventory);
        }
        return inventory;
    }

    getCountOfRecipe(recipeName: string) {
        let count = 0;
        for (const materialRecipe of this.toValueArray()) {
            if (materialRecipe.getValueOrthrow().name === recipeName) {
                count += 1;
            }
        }
        return count;
    }

    public unCraftInventory(inventory: MaterialInventory) {
        for (const recipe of this.toValueArray()) {
            for (let i = 0; i < recipe.quantity; i++) {
                inventory = recipe.getValueOrthrow().unCraft(inventory);
            }
        }
        return inventory;
    }
}

