import {RecipeChain} from "@/utils/ORMEntities/Recipes/inventory/RecipeChain";
import {RecipeChainBuilder} from "@/utils/calculators/Recipe/RecipeChainBuilder";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {ChainFinder} from "@/utils/calculators/Recipe/ChainFinder";

export class RecipeChainFinderStep {
    //private _isEndOfChain: boolean;
    public recipeChain: RecipeChain;
    private _hasAllChildrenBranchesIrreducible = false;
    private _inventory: MaterialInventory | undefined;
    private _isIrreducible: boolean | undefined;
    private readonly builder: RecipeChainBuilder;
    public knownChildren: RecipeChainFinderStep[] = [];
    public knownParents: RecipeChainFinderStep[] = [];
    public targetInventory: MaterialInventory

    public save() {this.builder.allRecipeChainSteps.insert(this)}

    constructor(builder: RecipeChainBuilder, recipeChain: RecipeChain, targetInventory: MaterialInventory) {
        this.builder = builder;
        this.recipeChain = recipeChain;
        this.targetInventory = targetInventory;
    }

    public get canHaveChildren() {
        // If it is irreducible, then there is no more need for children
        return !this.isIrreducible
            // If a parent had some intermediary materials, prevent making more of those.
            // Intermediary materials need to be reimbursed down the line anyway, so we force it to do it now.
            // If not, intermediary materials risk building-up, and reimbursing those will cost more than the best
            // chain's cost
            //&& !this.parents.some(parent =>
            // this.invIntermediaryMaterialsToReduce.isSuperiorByAtLeastOne(parent.invIntermediaryMaterialsToReduce))
            && !this.isEndOfChain;
    }

    get children() {return this.childrenIds.map(id => this.builder.allRecipeChainSteps.getOrCreate(id));}

    get childrenIds() {
        return this.getChildren().map(child => child.id);
    }

    public get hasAllChildrenBranchesIrreducible(): boolean {
        this._hasAllChildrenBranchesIrreducible = this._hasAllChildrenBranchesIrreducible
            || this.isIrreducible
            // Check for a children that haven't all its children irreducible. If there is one, that means this has not
            // all its children irreducible
            || (this.hasChildren && !this.notGenChildren.some(child => !child.hasAllChildrenBranchesIrreducible));
        return this._hasAllChildrenBranchesIrreducible;
    }

    //get childrenIds(): string[] {
    //    const childrenIds = this.parentChildRelation.getFromLeftTable(this.id);
    //    if (childrenIds.length !== 0) {return childrenIds;}
//
    //    this.generateChildrenSmart();
    //    return this.childrenIds;
    //}

    public get hasChildren() { return this.notGenChildrenId.length !== 0; }

    get id() {return this.recipeChain.id;}

    public get invFinalMatsToReduce() {return this.inventoryToReduce.filterKeys(this.recipeTable.finalMaterialsId);}

    /** Extra materials at the end of the chain */
    public get invIntermediaryAndFinalExtras() {return this.inventory.invertQuantities().getPositiveNonNullCounts();}

    /** Get the extra intermediary materials made by this recipe chain */
    public get invIntermediaryExtras() {return this.invIntermediaryMaterialsToReduce.invertQuantities().getPositiveNonNullCounts();}

    public get invIntermediaryMaterialsToReduce() {return this.inventoryToReduce.filterKeys(this.recipeTable.intermediaryMaterialsId);}

    public get invPrimaryMatsToReduce(): MaterialInventory {return this.inventoryToReduce.filterKeys(this.recipeTable.getPrimaryMaterialsId());}

    /** The inventory left to reduce */
    public get inventory(): MaterialInventory {
        if (this._inventory !== undefined) {return this._inventory;}
        this._inventory = this.recipeChain.unCraftInventory(this.targetInventory);
        return this._inventory;
    }

    public get inventoryExtras() {return this.inventory.invertQuantities().getPositiveNonNullCounts();}

    /** Return the materials to reduce, including the primary materials */
    public get inventoryToReduce() {return this.inventory.getPositiveNonNullCounts();}

    public get isEndOfChain(): boolean {
        //if(this._isEndOfChain !== undefined){return this._isEndOfChain;}
        //this._isEndOfChain = this.isIrreducible
        //TODO: Check if child of endedStep
        //return this._isEndOfChain;
        return this.isIrreducible || this.builder.allRecipeChainSteps.getAllIrreducible().some(irreduStep => this.isChildOf(irreduStep));
    }

    public get isIrreducible(): boolean {
        if (this._isIrreducible !== undefined) { return this._isIrreducible;}
        const primaryMaterials = this.builder.recipes.getPrimaryMaterialsId();

        this._isIrreducible = !this.inventoryToReduce.toValueArray().some(matQuant => {
            // Find a material that isn't primary and as a value superior to zero
            if (primaryMaterials.includes(matQuant.id)) {return false;}

            return matQuant.quantity > 0;
        });

        return this._isIrreducible;
    }

    public get parentIds() {
        //this.parentChildRelation.getFromRightTable(this.id);
        // TODO: Put the new ids into the relationship table
        return this.recipeChain.getPossibleParents();
    }

    public get parents() {
        const parents = this.parentIds.map(chain => this.builder.allRecipeChainSteps.getOrCreate(chain.id));
        return parents;
    }

    /** Materials required at the start of the chain */
    get primaryAndIntermediaryMaterials() {
        return this.inventory.getPositiveNonNullCounts();
    }

    public get recipeTable() {return this.builder.recipes;}

    private get notGenChildren() {return this.notGenChildrenId.map(id => this.builder.allRecipeChainSteps.getOrThrow(id));}

    private get notGenChildrenId() {return this.parentChildRelation.getFromLeftTable(this.id);}

    private get parentChildRelation() {return this.builder.allRecipeChainSteps.parentChildRelation;}

    public debug_log(currentFinder: ChainFinder) {
        const logString = `${this.id}
            - Parents: ${this.parents.map(par => par.id)}
            - Children: ${this.children}
            - is Irreducible: ${this.isIrreducible}
            - is optimized: ${this.isOptimizedChild()}
            - Useful children: ${this.shouldExploreChildren(currentFinder)}`;
        console.log(logString);
    }

    public generateChildrenSmart() {
        const recipeToAddToChildren = this.getBestNextRecipes();

        recipeToAddToChildren // Put the best recipe to do at the end
            .forEach(recipe => {
                const child = new RecipeChainFinderStep(this.builder, this.recipeChain.cloneShallow().addToItemQuantity(recipe.id, 1));

                this.parentChildRelation.linkIds(this.id, child.id);

                if (this.builder.allRecipeChainSteps.get(child.id) !== undefined) {return;}
                this.builder.allRecipeChainSteps.insertOrThrow(child);
            });
    }

    public getBestNextRecipes() {
        return this.recipeTable
                   .toValueArray()
                   .filter(recipe => {
                       // Filter out all the recipes that don't produce what we need
                       if (!recipe.materialIdProduced.includeOneOf(this.inventoryToReduce.toKeyArray())) { return false; }

                       // If the step has some intermediary materials to process, process them now.
                       // The sooner we know the cost in primary materials, the better.
                       //
                       // We do that by refusing all recipes that don't produce an intermediary material needing
                       // reducing.
                       if (!this.invIntermediaryMaterialsToReduce.isNull() && !recipe.materialIdProduced.includeOneOf(this.invIntermediaryMaterialsToReduce.toKeyArray())) {return false;}

                       // If the recipe is producing intermediary materials, remove it if it needs to get reduced,
                       // This prevents making tons of intermediary material to only get later processed for a high
                       // cost
                       //if (this.invIntermediaryMaterialsToReduce.toKeyArray().some(mat =>
                       // recipe.consumedMaterials.includes(mat))) {return false;}

                       return true;
                   });
    }

    public getChildren() {
        const children = this.builder.allRecipeChainSteps
                             .parentChildRelation.getFromRightTable(this.id)
                             .map(idChild => this.builder.allRecipeChainSteps.getOrCreate(idChild));

        // Check if I got all the children
        if (this.recipeChain.getNumberOfChildren() === children.length) {return children;}

        // If not, generate them all
        const generatedChildren = this.recipeChain.getPossibleChildren();
        generatedChildren.forEach(child => {this.builder.allRecipeChainSteps.parentChildRelation.linkIds(this.id, child.id);});

        return generatedChildren;
    }

    /** Get the step that has only recipes that produces final materials */
    public getStepWithOnlyFinalRecipes() {
        return this.builder.allRecipeChainSteps.getOrCreate(
            this.recipeChain.getFinalRecipesChain().id
        );
    }

    /** Return true if the step has a counterpart that has the same final mat recipe, but is more reduced */
    public hasAMoreReducedCounterpart() {

    }

    public hasMorePrimaryMaterials(otherStep: RecipeChainFinderStep, sortedBy: string[]) {
        // You can only compare to a completed chain
        if (!otherStep.isIrreducible) {return false;}

        // One material must be superior
        return this.invPrimaryMatsToReduce.isSortedAfter(otherStep.invPrimaryMatsToReduce, sortedBy);
    }

    public hasMoreStepsForSameInventory(otherStep: RecipeChainFinderStep) {
        // It must have more steps
        if (this.recipeChain.totalNumberOfItems < otherStep.recipeChain.totalNumberOfItems) {return false;}

        // The inventory must be equal
        return this.inventory.isEqual(otherStep.inventory);
    }

    public hasMoreStepsForTheSameFinalPrimaryMaterials(otherStep: RecipeChainFinderStep) {
        // It must be a completed chain
        if (!this.isIrreducible) {return false;}

        // The step compared against must be a completed chain
        if (!otherStep.isIrreducible) {return false;}

        // It must have more steps
        if (!(this.recipeChain.totalNumberOfItems > otherStep.recipeChain.totalNumberOfItems)) {return false;}

        // It must be equal
        return this.invPrimaryMatsToReduce.isEqual(otherStep.invPrimaryMatsToReduce);
    }

    public isChildOf(maybeParentStep: RecipeChainFinderStep): boolean {
        return this.recipeChain.isChildOf(maybeParentStep.recipeChain);
    }

    /** Return true if this child is optimzed compared to the parents */
    public isOptimizedChild() {
        // Check if all parent-child couples are optimized
        return this.parents.every(parent => {
            // If there is no material needing reducing that has been reduced, then the child is not optimized
            const hasntReducedAnything = parent.inventoryToReduce.doesntMatchOne(mat => {
                return mat.quantity > this.inventoryToReduce.getOrCreate(mat.id).quantity;
            });
            if (hasntReducedAnything) {return false;}


            // If the parent has intermediary materials to reduce,
            // And if there isn't one that has been reduced, then the child is not optimized
            const hasntReducedAIntermediaryMaterial = parent.invIntermediaryMaterialsToReduce.doesntMatchOne(inteMateOfParent => inteMateOfParent.quantity > this.inventoryToReduce.getOrCreate(inteMateOfParent.id).quantity);
            if (
                !parent.invIntermediaryMaterialsToReduce.isNull()
                && hasntReducedAIntermediaryMaterial
            ) {return false;}

            //TODO: Check if step has a counterpart with extra materials fully reduced

            return true;
        });
    }

    public isWorse(otherStep: RecipeChainFinderStep, currentFinder: ChainFinder) {
        // You can't be worse than yourself
        if (this.id === otherStep.id) {return false;}

        // If you aren't valid, then you're worse
        if (!currentFinder.isStepValid(this)) {return true;}

        // If the other step isn't valid, then you're not worse because incompatible
        if (!currentFinder.isStepValid(otherStep)) {return false;}

        if (this.hasMorePrimaryMaterials(otherStep, currentFinder.allowedPrimaryMaterials)) {return true;}

        if (this.hasMoreStepsForSameInventory(otherStep)) {return true;}

        return this.hasMoreStepsForTheSameFinalPrimaryMaterials(otherStep);
    }

    public shouldExploreChildren(currentFinder: ChainFinder) {
        const worseThanBests = currentFinder.stepWorseThanBests(this);
        const HadInterMat = this.parents.some(parent => this.invIntermediaryExtras.isSuperiorByAtLeastOne(parent.invIntermediaryExtras));
        const childOfIree = this.builder.allRecipeChainSteps.getAllIrreducible().some(irreduStep => this.isChildOf(irreduStep));
        return !(
            this.isIrreducible

            // The step must be valid
            || !currentFinder.isStepValid(this)

            // If the step is worse than the best steps, don't do it
            || worseThanBests

            // If a parent had some intermediary materials, prevent making more of those.
            // Intermediary materials need to be reimbursed down the line anyway, so we force it to do it now.
            // If not, intermediary materials risk building-up, and reimbursing those will cost more than the best
            // chain's cost || HadInterMat

            //If the step is the child of an irreducible step, then prevent making more children
            || childOfIree
        );
    }
}

