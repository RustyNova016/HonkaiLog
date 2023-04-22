import {RecipeChain} from "@/utils/ORMEntities/Recipes/inventory/RecipeChain";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {RecipeChainTable} from "@/utils/ORMEntities/Recipes/inventory/RecipeChainTable";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {RecipeChainFinder} from "@/utils/calculators/Recipe/RecipeChainFinder";
import {Dictionary} from "@/utils/classes/Dictionary";
import {RecipeChainCostCategory} from "@/utils/calculators/Recipe/RecipeChainCostCategory";

export class RecipeChainFinderStepOld {
    public childrenRecipeChainsIDs: string[] = [];
    public isDeadEnd = false;
    public worseThan: string | undefined = undefined;
    private _inventory: MaterialInventory | undefined;
    private _isEndOfChain: boolean | undefined;
    private _isIrreducible: boolean | undefined;
    private _possibleNextRecipes: MaterialRecipe[] | undefined;
    private _primaryInventory: MaterialInventory | undefined;
    private isWorseThanCache = new Dictionary<string, boolean>();
    private recipeChainFinder: RecipeChainFinder;
    public recipeChain: RecipeChain;
    private targetInventory: MaterialInventory;

    constructor(targetInventory: MaterialInventory, recipeChain: RecipeChain, recipeChainFinder: RecipeChainFinder) {
        this.recipeChainFinder = recipeChainFinder;
        this.recipeChain = recipeChain;
        this.targetInventory = targetInventory;
    }

    get availableRecipes() {
        return this.recipeChainFinder.availableRecipes;
    }

    get costCategory() { return new RecipeChainCostCategory(this.primaryInventory.toKeyArray());}

    get currentBestSteps() {
        return this.recipeChainFinder.bestCompletedSteps;
    }

    /** Extra materials at the end of the chain */
    get extraMaterials() {
        return this.inventory.invertQuantities().getPositiveNonNullCounts();
    }

    get id() {return this.recipeChain.id;}

    get idCostCategory() {this.costCategory.id;}

    public get inventory(): MaterialInventory {
        if (this._inventory !== undefined) {return this._inventory;}
        this._inventory = this.recipeChain.unCraftInventory(this.targetInventory.cloneShallow());
        return this._inventory;
    }

    get isCompletedChain() {return this.getPossibleNextRecipes().length === 0;}

    /** Return true if the chain shouldn't continue */
    public get isEndOfChain(): boolean {
        if (this._isEndOfChain === true) {return this._isEndOfChain;}

        this._isEndOfChain = this.isIrreducible
            || this.hasOneParentBeingEndOfChain()
            //|| this.currentBestSteps.some(bestStep => this.isWorse(bestStep));

        return this._isEndOfChain;
    }

    /** Return true if the step can be explored, and is worth it */
    get isExplorable() {return !(this.isCompletedChain || this.isDeadEnd);}

    /** Return true if the step has generated children */
    get isExplored() {return this.childrenRecipeChainsIDs.length !== 0;}

    /** If the inventory is just primary materials */
    get isIrreducible(): boolean {
        if (this._isIrreducible != undefined) {return true;}
        this._isIrreducible = this.getPossibleNextRecipes().length === 0;
        return this._isIrreducible;
    }

    /** Materials required at the start of the chain */
    get materialsRequired() {
        return this.inventory.getPositiveNonNullCounts();
    }

    get parents() {
        return this.recipeChainFinder.getParentStepsOf(this.id);
    }

    get primaryInventory(): MaterialInventory {
        if (this._primaryInventory !== undefined) {return this._primaryInventory;}

        this._primaryInventory = this.inventory.filterKeys(this.availableRecipes.getPrimaryMaterialsId());
        return this._primaryInventory;
    }

    /** Check if the step is a dead end. AKA, worse than a better step */
    public checkIfDeadEnd(bestSteps: RecipeChainFinderStepOld[]) {
        this.isDeadEnd = bestSteps.some(bestStep => this.isWorse(bestStep));
        return this.isDeadEnd;
    }

    /** Return all the possible Recipe Inventories */
    public generateChildrenRecipeChains(recipeChainTable: RecipeChainTable) {
        const recipeAvailable = this.getPossibleNextRecipes();
        const childrenRecipeChains = recipeAvailable.map(recipe => this.recipeChain.cloneShallow().addToItemQuantity(recipe.id, 1));

        recipeChainTable.insertMultiple(childrenRecipeChains);
        this.childrenRecipeChainsIDs = childrenRecipeChains.map(recipeChain => recipeChain.id);
        return this;
    }

    public getAllChildren() {
        return this.getChildrenFromRecipes(this.availableRecipes.toValueArray());
    }

    public getPossibleNextRecipes() {
        if (this._possibleNextRecipes !== undefined) {return this._possibleNextRecipes;}
        this._possibleNextRecipes = this.availableRecipes.toValueArray_sortedByIncreasingCompatibility(this.materialsRequired, this.extraMaterials);
        return this._possibleNextRecipes;
    }

    getPrimaryMaterialsInventory() {
        return this.inventory.filterKeys(this.availableRecipes.getPrimaryMaterialsId());
    }

    public getUsefulChildren() {
        return this.getChildrenFromRecipes(this.getPossibleNextRecipes());
    }

    public hasMorePrimaryMaterials(otherStep: RecipeChainFinderStepOld) {
        // You can only compare to a completed chain
        if (!otherStep.isCompletedChain) {return false;}

        // All the material must have the exact same count or more
        if (!this.primaryInventory.isSuperiorOrEqual(otherStep.primaryInventory)) {return false;}

        // The primary material must also not be the same
        return !this.primaryInventory.isEqual(otherStep.primaryInventory);
    }

    public hasMoreStepsForSameInventory(otherStep: RecipeChainFinderStepOld) {
        // It must have more steps
        if (this.recipeChain.totalNumberOfItems < otherStep.recipeChain.totalNumberOfItems) {return false;}

        // The inventory must be equal
        return this.inventory.isEqual(otherStep.inventory);
    }

    public hasMoreStepsForTheSameFinalPrimaryMaterials(otherStep: RecipeChainFinderStepOld) {
        // It must be a completed chain
        if (!this.isCompletedChain) {return false;}

        // The step compared against must be a completed chain
        if (!otherStep.isCompletedChain) {return false;}

        // It must have more steps
        if (!(this.recipeChain.totalNumberOfItems > otherStep.recipeChain.totalNumberOfItems)) {return false;}

        // It must be equal
        return this.primaryInventory.isEqual(otherStep.primaryInventory);
    }

    public hasOneParentBeingEndOfChain(): boolean {
        return this.parents.some(parent => parent._isEndOfChain)
            || this.recipeChainFinder.endsOfChain.some(endOfChain => this.isChildOf(endOfChain));
    }

    public isChildOf(maybeParentStep: RecipeChainFinderStepOld): boolean {
        //TODO: Perf increase? -> Check if the step asked is a parent of this step
        return this.recipeChain.isChildOf(maybeParentStep.recipeChain);
    }

    public isWorse(otherStep: RecipeChainFinderStepOld) {
        const cacheHit = this.isWorseThanCache.get(otherStep.id);
        if (cacheHit !== undefined) {return cacheHit;}

        const thisInvID = this.getPrimaryMaterialsInventory().id;
        const otherInvID = otherStep.getPrimaryMaterialsInventory().id;

        if (this.id === otherStep.id) {return false;}

        if (this.hasMorePrimaryMaterials(otherStep)) {return true;}

        if (this.hasMoreStepsForSameInventory(otherStep)) {return true;}

        return this.hasMoreStepsForTheSameFinalPrimaryMaterials(otherStep);
    }

    public isWorseThanCurrentBestSteps(): boolean {
        return this.recipeChainFinder.bestCompletedSteps.some(bestStep => {
            if (this.isWorse(bestStep)) {
                this.worseThan = bestStep.id;
                return true;
            }
        });
    }

    toString() {
        return `Recipe Chain: ${this.recipeChain.id}, Inventory: ${this.inventory.id}`;
    }

    private getChildrenFromRecipes(recipes: MaterialRecipe[]) {
        return recipes.map(recipe => this.recipeChain.cloneShallow().addToItemQuantity(recipe.id, 1));
    }
}