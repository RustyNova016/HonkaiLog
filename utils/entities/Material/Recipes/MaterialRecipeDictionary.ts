import {idMaterial} from "@/utils/entities/Material/Material";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {MaterialRecipeJSON} from "@/utils/types/materials/MaterialInfo";
import {IdObjectDictionary} from "@/utils/classes/IdObjectDictionary";
import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {RecipeChainCalculator} from "@/utils/entities/Material/Recipes/recipeChain/RecipeChainCalculator";

export class MaterialRecipeDictionary extends IdObjectDictionary<MaterialRecipe> { //TODO: Extend Dictionary
    /** List of materials that can be consumed by at least one recipe */
    get consumableMaterials() {
        //TODO: Deduplicate
        const out: string[] = [];
        this.forEach(recipe => out.push(...recipe.materialsRequired.toKeyArray()));
        return out;
    }

    /** List of materials that can be produced by at least one recipe */
    get producibleMaterials() {
        //TODO: Deduplicate
        const out: string[] = [];
        this.forEach(recipe => out.push(...recipe.materialProduced.toKeyArray()));
        return out;
    }

    public createChainCalculatorForInventory(inventory: MaterialInventory, extraMaterials: string[] = []) {
        const recipesConcerned = this.getRecipesForInventory(inventory);

        extraMaterials.forEach(material => {recipesConcerned.addMultiple(this.getRecipesProducing(material).toValueArray())})

        return new RecipeChainCalculator(recipesConcerned, inventory)
    }

    /** Get all the recipe producing the inventory's materials */
    public getRecipesForInventory(inventory: MaterialInventory) {
        const recipesConcerned = new MaterialRecipeDictionary()

        for (const materialQuantityType of inventory.getMaterialWithPositiveCounts().toValueArray()) {
            recipesConcerned.merge(this.getRecipesProducing(materialQuantityType.idMaterial))
        }

        return recipesConcerned;
    }

    static fromJSON(recipes: MaterialRecipeJSON[]) {
        return new MaterialRecipeDictionary().addMultiple(recipes.map(value => MaterialRecipe.fromJSON(value)));
    }

    public addFromJson(recipes: MaterialRecipeJSON[]) {
        this.addMultiple(recipes.map(value => MaterialRecipe.fromJSON(value)));
        return this
    }


    /** Get all the recipe producing a material */
    getRecipesProducing(idMaterial: idMaterial) {
        const recipeOutput = new MaterialRecipeDictionary()

        for (const recipe of this.toValueArray()) {
            if (recipe.canProduceMaterial(idMaterial)) { recipeOutput.add(recipe); }
        }

        return recipeOutput
    }

    /** Return the ids of all the materials that are consumed, and have no recipes to be crafted */
    getPrimaryMaterials() {
        const primaryMaterials: string[] = [];

        const inProducibleList = (consumable: string): boolean => {
            for (const producibleMaterial of this.producibleMaterials) {
                if (consumable === producibleMaterial) {return true;}
            }
            return false;
        };

        for (const consumable of this.consumableMaterials) {
            if (!inProducibleList(consumable)) {primaryMaterials.push(consumable);}
        }

        return primaryMaterials
    }
}

