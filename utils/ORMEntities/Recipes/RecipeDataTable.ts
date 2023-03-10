import {DataTable} from "@/utils/classes/ORM/DataTable";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {MaterialRecipeJSON} from "@/utils/types/materials/MaterialInfo";
import {MaterialDataTable} from "@/utils/ORMEntities/Materials/MaterialDataTable";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";
import {RecipeChainBuilder} from "@/utils/calculators/Recipe/RecipeChainBuilder";

export class RecipeDataTable extends DataTable<MaterialRecipe> {
    public get intermediaryMaterialsId() {
        const consumables = this.getAllConsumableMaterials();
        const producible = this.getAllProducedMaterials();
        return [...consumables, ...producible].filter(material => consumables.includes(material) && producible.includes(material));
    }

    /** All the materials that can be produced, but not consumed */
    public get finalMaterialsId() {
        const consumables = this.getAllConsumableMaterials();
        const producible = this.getAllProducedMaterials();
        return producible.filter(material => !consumables.includes(material));
    }

    public filterToRecipeThatConsume(idMats: string[]) {
        return this.filterValues(recipe => recipe.consumedMaterials.includeOneOf(idMats));
    }

    fromJSON(data: MaterialRecipeJSON[], materialTable: MaterialDataTable | undefined = undefined) {
        return new RecipeDataTable().insertMultipleOrThrow(data.map(json => MaterialRecipe.fromJSON(json, materialTable)));
    }

    public getAllConsumableMaterials() {
        const consumables = new CollectionOfUnique<string>();
        this.toValueArray().forEach(recipe => consumables.push(...recipe.consumedMaterials));
        return consumables;
    }

    public getAllProducedMaterials() {
        const produced = new CollectionOfUnique<string>();
        this.toValueArray().forEach(recipe => produced.push(...recipe.producedMaterials));
        return produced;
    }

    /** Return all the materials that can be consumed, but not created */
    public getPrimaryMaterialsId() {
        const producedMaterials = this.getAllProducedMaterials();
        return this.getAllConsumableMaterials()
                   .filter(material => !producedMaterials.includes(material));
    }

    public getRecipeChainFinderForInventory(inventory: MaterialInventory, extraMaterials: string[] = []) {
        const recipesNeeded = new RecipeDataTable();

        recipesNeeded.insertMultipleOrThrow(this.getRecipesThatProduce([...inventory.toKeyArray(), ...extraMaterials]));

        return new RecipeChainBuilder(inventory, recipesNeeded);
    }

    /** Return the recipes that consume at least one of the materials */
    public getRecipesThatConsume(idMats: string[]) {
        return this.toValueArray().filter(recipe => recipe.consumedMaterials.includeOneOf(idMats));
    }

    /** Return the recipes that produce at least one of the materials */
    public getRecipesThatProduce(idMats: string[]) {
        return this.toValueArray().filter(recipe => recipe.producedMaterials.includeOneOf(idMats));
    }

    insertMultipleFromJSON(data: MaterialRecipeJSON[], materialTable: MaterialDataTable | undefined = undefined) {
        data.forEach(value => this.insertOrThrow(
            MaterialRecipe.fromJSON(value, materialTable)
        ));
        return this;
    }

    public toValueArray_sortedByIncreasingCompatibility(matInventoryWanted: MaterialInventory, currentMatInv: MaterialInventory, removeIncompatibleRecipes = true) {


        return this
            // Get the recipes
            .toValueArray()

            // Filter out the recipes that don't give anything wanted
            .filter(recipe =>
                        !removeIncompatibleRecipes
                        || matInventoryWanted
                            .toKeyArray()
                            .some(matWanted => recipe.canProduceMaterial(matWanted))
            )

            // Set the compatibility scores
            .map((recipe): [MaterialRecipe, number] => [recipe, recipe.getRecipeCompatibility(matInventoryWanted, currentMatInv)])

            // Sort by compatibility
            .sort((a, b) => {
                if (a[1] === b[1]) {return 0;}
                if (a[1] < b[1]) {return -1;}
                return 1;
            })

            // Get only the recipe
            .map(couple => couple[0]);
    }
}