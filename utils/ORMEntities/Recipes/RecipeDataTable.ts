import {DataTable} from "@/utils/classes/ORM/DataTable";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {RecipeChainFinder} from "@/utils/calculators/Recipe/RecipeChainFinder";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {MaterialRecipeJSON} from "@/utils/types/materials/MaterialInfo";
import {MaterialDataTable} from "@/utils/ORMEntities/Materials/MaterialDataTable";

export class RecipeDataTable extends DataTable<MaterialRecipe> {
    fromJSON(data: MaterialRecipeJSON[], materialTable: MaterialDataTable | undefined = undefined) {
        return new RecipeDataTable().insertMultiple(data.map(json => MaterialRecipe.fromJSON(json, materialTable)))
    }

    public getRecipeChainFinderForInventory(inventory: MaterialInventory, extraMaterials: string[] = []) {
        const recipesConcerned = this.getRecipeTableThatConsume(inventory.toKeyArray());

        recipesConcerned.insertMultiple(this.getRecipesThatConsume(extraMaterials))

        return new RecipeChainFinder(recipesConcerned, inventory)
    }

    /** Return the recipes that consume at least one of the materials */
    public getRecipeTableThatConsume(idMats: string[]) {
        return new RecipeDataTable().insertMultiple(this.getRecipesThatConsume(idMats))
    }

    /** Return the recipes that consume at least one of the materials */
    public getRecipesThatConsume(idMats: string[]) {
        return this.toValueArray().filter(recipe => recipe.consumedMaterials.includeOneOf(idMats))
    }

    insertMultipleFromJSON(data: MaterialRecipeJSON[], materialTable: MaterialDataTable | undefined = undefined) {
        data.forEach(value => this.insert(
            MaterialRecipe.fromJSON(value, materialTable)
        ))
        return this
    }
}