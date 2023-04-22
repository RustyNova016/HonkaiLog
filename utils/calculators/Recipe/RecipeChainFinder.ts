import {DataTable} from "@/utils/classes/ORM/DataTable";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {RecipeChainFinderStepOld} from "@/utils/calculators/Recipe/ChainStep/RecipeChainFinderStepOld";
import {RecipeChainTable} from "@/utils/ORMEntities/Recipes/inventory/RecipeChainTable";
import {IdChecklist} from "@/utils/classes/ORM/IdChecklist";
import {RecipeChain} from "@/utils/ORMEntities/Recipes/inventory/RecipeChain";
import {ListOfBest} from "@/utils/classes/ORM/listOfBest";
import _ from "lodash";
import {ManyToMany} from "@/utils/classes/ORM/ManyToMany";
import {RecipeChainCostCategoryTable} from "@/utils/calculators/Recipe/RecipeChainCostCategory";
import {OneToMany} from "@/utils/classes/ORM/OneToMany";

export interface RecipeChainFinderInterface {
    irreducibleSteps: RecipeChainFinderStepOld
}




export class RecipeChainFinder extends DataTable<RecipeChainFinderStepOld> implements RecipeChainFinderInterface {
    public readonly availableRecipes: RecipeDataTable;
    public readonly parentChildrenSteps = new ManyToMany();
    public processCounter = 0;
    public readonly recipeChain_primaryMaterialCategory = new OneToMany<RecipeChainFinder, RecipeChainCostCategoryTable>(this, new RecipeChainCostCategoryTable());
    private readonly _completedChainList = new IdChecklist();
    private readonly _endedChains = new IdChecklist();
    private readonly _toppestEndOfChains = new ListOfBest();
    private readonly allRecipeChains = new RecipeChainTable();
    private readonly bestCompletedChains = new ListOfBest();
    private skippedCount = 0;
    private readonly startGenTime = performance.now();
    /** The inventory wanted */
    private readonly targetInventory: MaterialInventory;
    private readonly unexploredChains = new IdChecklist();

    constructor(availableRecipes: RecipeDataTable, targetInventory: MaterialInventory) {
        super();
        this.availableRecipes = availableRecipes;
        this.targetInventory = targetInventory;

        this.bestCompletedChains.isWorse = (idBase, otherId) => this.getOrThrow(idBase).isWorse(this.getOrThrow(otherId));
        this._toppestEndOfChains.isWorse = (idBase, otherId) => this.getOrThrow(idBase).isChildOf(this.getOrThrow(otherId));

        //Create the first step
        this.allRecipeChains.insert(new RecipeChain(this.availableRecipes));
        this.unexploredChains.set("", true);
        this.getOrCreate("");
    }

    irreducibleSteps: RecipeChainFinderStepOld;

    /** Return the best steps of the array */
    get bestCompletedSteps() {
        return this.bestCompletedChains.bests.map(id => this.getOrThrow(id));
    }

    public get completedChains() {
        return this._completedChainList.trueValues.map(chainId => this.allRecipeChains.getOrThrow(chainId));
    }

    get endsOfChain() {
        return this._toppestEndOfChains.bests.map(endOfChain => this.getOrThrow(endOfChain));
    }

    public create(idStep: string) {
        this.insertOrThrow(
            new RecipeChainFinderStepOld(this.targetInventory, this.allRecipeChains.getOrThrow(idStep), this));
    }

    public generateStepsDepthFirst() {
        while (this.unexploredChains.trueValues.length !== 0) {
            const idStep = this.unexploredChains.trueValues.at(0);
            if (idStep === undefined) {break;}

            this.processStep(idStep);
        }
    }

    public getOrCreate(idStep: string) {
        const got = this.get(idStep);
        if (got !== undefined) {return got;}

        this.create(idStep);
        return this.getOrThrow(idStep);
    }

    public getParentStepsOf(idChain: string) {
        return this.parentChildrenSteps.getFromLeftTable(idChain).map(idParent => this.getOrCreate(idParent));
    }

    private addNewChain(chain: RecipeChain, parentChainId: string) {
        this.parentChildrenSteps.linkIds(parentChainId, chain.id);
        this.allRecipeChains.insert(chain);
        this.unexploredChains.setIfNew(chain.id, true);
    }

    private isChainChildOfEndedChain(idChain: string) {
        const chain = this.allRecipeChains.getOrThrow(idChain);
        return this
            ._toppestEndOfChains
            .trueValues
            .map(idEndedChain => this.allRecipeChains.getOrThrow(idEndedChain))
            .some(endedRecipeChain => chain.isChildOf(endedRecipeChain));
    }

    private processStep(idStep: string) {
        // Get or create the step
        this.processCounter += 1;
        this.statLog("Exploring:", idStep);
        const step = this.getOrCreate(idStep);

        this.unexploredChains.set(step.id, false);

        //this._completedChainList.set(step.id, step.isComplete)
        this.bestCompletedChains.set(step.id, step.isIrreducible);

        //this._endedChains.set(step.id, step.isEndOfChain)
        this._toppestEndOfChains.set(step.id, step.isEndOfChain);

        // If it's a child of an ended chain, then don't process it
        if (step.isEndOfChain) {return;}

        step.getUsefulChildren().forEach(child => {this.addNewChain(child, idStep);});

        //TODO: Check if searching if skipping if step is parent of uncompleted steps worth it
    }


    private statLog(...args: any[]) {
        const allStepCount = this.unexploredChains.size;
        const percentComplete = _.floor((this.processCounter / allStepCount) * 100, 4);
        const skippedPercent = _.floor((this.skippedCount / allStepCount) * 100, 4);
        const timeSpent = performance.now() - this.startGenTime;
        const iPerMs = _.floor(this.processCounter / timeSpent, 4);
        console.log(`i:${this.processCounter} - r:${this.unexploredChains.trueValues.length} - s${this.skippedCount} (${skippedPercent}%) - t:${allStepCount} (${percentComplete}%) - T${timeSpent} - i/ms:${iPerMs} -`, ...args);
    }
}

