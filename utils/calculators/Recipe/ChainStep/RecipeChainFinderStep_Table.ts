import {DataTable} from "@/utils/classes/ORM/DataTable";
import {RecipeChainFinderStep} from "@/utils/calculators/Recipe/ChainStep/RecipeChainFinderStep";
import {ManyToMany} from "@/utils/classes/ORM/ManyToMany";
import {IdChecklist} from "@/utils/classes/ORM/IdChecklist";
import {RecipeChainBuilder} from "@/utils/calculators/Recipe/RecipeChainBuilder";
import {RecipeChainTable} from "@/utils/ORMEntities/Recipes/inventory/RecipeChainTable";
import {OneToMany} from "@/utils/classes/ORM/OneToMany";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";

export class RecipeChainFinderStep_Table extends DataTable<RecipeChainFinderStep> {
    public allRecipeChains;
    public parentChildRelation = new ManyToMany();
    public finalStep_FinalStepReduced = new OneToMany();
    private readonly builder: RecipeChainBuilder;
    private irreducibleSteps = new IdChecklist();
    private readonly recipes;
    public step_TargetInventory = new ManyToMany();

    constructor(builder: RecipeChainBuilder) {
        super();
        this.builder = builder;
        this.recipes = builder.recipes;
        this.allRecipeChains = new RecipeChainTable(this.recipes);
    }

    /** Create a new inventory entry */
    createEntry(idItem: string) {
        this.set(
            idItem,
            new RecipeChainFinderStep(
                this.builder,
                this.allRecipeChains.getOrCreate(idItem)
            )
        );
    }

    public getAllAwaitingChild() {
        return this.toValueArray().filter(val => !val.hasChildren && !val.canHaveChildren);
    }

    public getAllIrreducible() {
        return this.irreducibleSteps.trueValues.map(id => this.getOrThrow(id));
    }

    /** Get an entry, and if it doesn't exist, create a new one */
    public getOrCreate(idItem: string): RecipeChainFinderStep {
        const res = this.get(idItem);
        if (res !== undefined) {return res;}

        this.createEntry(idItem);
        return this.getOrThrow(idItem);
    }

    public override insert(step: RecipeChainFinderStep) {
        step.knownParents.forEach(parent => {this.parentChildRelation.linkIds(parent.id, step.id)})
        step.knownChildren.forEach(child => {this.parentChildRelation.linkIds(step.id, child.id)})
        this.step_TargetInventory.linkIds(step.id, step.targetInventory.id)
        this.irreducibleSteps.setIfNew(step.id, step.isIrreducible);
        return super.insert(step);
    }
}