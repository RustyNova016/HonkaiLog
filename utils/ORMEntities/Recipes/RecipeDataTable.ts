import {DataTable} from "@/utils/classes/ORM/DataTable";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {MaterialRecipeJSON} from "@/utils/types/materials/MaterialInfo";
import {MaterialDataTable} from "@/utils/ORMEntities/Materials/MaterialDataTable";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";
import {RecipeChainBuilder} from "@/utils/calculators/Recipe/RecipeChainBuilder";

export class RecipeDataTable extends DataTable<MaterialRecipe> {
    /** All the materials that can be produced, but not consumed */
    public get finalMaterialsId() {
        const consumables = this.getAllConsumableMaterials();
        const producible = this.getAllProducedMaterials();
        return producible.filter(material => !consumables.includes(material));
    }

    /** All the materials that can be produced and consumed */
    public get intermediaryMaterialsId() {
        const consumables = this.getAllConsumableMaterials();
        const producible = this.getAllProducedMaterials();
        return [...consumables, ...producible].filter(material => consumables.includes(material) && producible.includes(material));
    }

    /** All the materials that can be consumed, but not produced */
    public get primaryMaterialsId() {
        const consumables = this.getAllConsumableMaterials();
        const producible = this.getAllProducedMaterials();
        return consumables.filter(material => !producible.includes(material));
    }

    public filterToRecipeThatConsume(idMats: string[]) {
        return this.filterValues(recipe => recipe.materialIdConsumed.includeOneOf(idMats));
    }

    public filterToRecipeThatProduce(idMats: string[]) {
        return this.filterValues(recipe => recipe.materialIdProduced.includeOneOf(idMats)).overwriteInto(new RecipeDataTable());
    }

    fromJSON(data: MaterialRecipeJSON[], materialTable: MaterialDataTable | undefined = undefined) {
        return new RecipeDataTable().insertMultipleOrThrow(data.map(json => MaterialRecipe.fromJSON(json, materialTable)));
    }

    public getAllConsumableMaterials() {
        const consumables = new CollectionOfUnique<string>();
        this.toValueArray().forEach(recipe => consumables.push(...recipe.materialIdConsumed));
        return consumables;
    }

    public getAllProducedMaterials() {
        const produced = new CollectionOfUnique<string>();
        this.toValueArray().forEach(recipe => produced.push(...recipe.materialIdProduced));
        return produced;
    }

    public getFinalMaterialRecipes() {
        return this.filterValues(recipe => recipe.materialIdProduced.includeOneOf(this.finalMaterialsId));
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
        return this.toValueArray().filter(recipe => recipe.materialIdConsumed.includeOneOf(idMats));
    }

    /** Return the recipes that produce at least one of the materials */
    public getRecipesThatProduce(idMats: string[]) {
        return this.toValueArray().filter(recipe => recipe.materialIdProduced.includeOneOf(idMats));
    }

    /** Return true if all the recipe requires less or the same amount of quantity material */
    public hasEnoughMaterialToUseAny(matId: string, quant: number) {
        return this.toValueArray().every(recipe => {
            return recipe.materialsRequired.getOrCreate(matId).quantity >= quant;
        });
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