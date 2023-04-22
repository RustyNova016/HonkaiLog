import {DataTable} from "@/utils/classes/ORM/DataTable";
import {RecipeChain} from "@/utils/ORMEntities/Recipes/inventory/RecipeChain";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";

/** Table containing possible Recipe Inventory combinations */
export class RecipeChainTable extends DataTable<RecipeChain> {
    public recipes: RecipeDataTable;

    constructor(recipes: RecipeDataTable) {
        super();
        this.recipes = recipes;
    }

    createEntry(idItem: string) {
        this.insert(RecipeChain.fromId(idItem, this.recipes))
    }

    public getOrCreate(idItem: string) {
        const res = this.get(idItem);
        if (res !== undefined) {return res;}

        this.createEntry(idItem);
        return this.getOrThrow(idItem);
    }
}