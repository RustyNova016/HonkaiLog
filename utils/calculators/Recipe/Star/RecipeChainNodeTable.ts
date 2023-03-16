import {DataTable} from "@/utils/classes/ORM/DataTable";
import {RecipeChainNode} from "@/utils/calculators/Recipe/Star/RecipeChainNode";
import {OneToMany} from "@/utils/classes/ORM/OneToMany";

export class RecipeChainNodeTable extends DataTable<RecipeChainNode> {
    public parent_Child = new OneToMany();

    public create(id: string) {
        this.insert(RecipeChainNode.fromId(id, this));
    }

    public getOrCreate(id: string): RecipeChainNode {
        let node = this.get(id);
        if (node !== undefined) {return node;}

        this.create(id);
        return this.getOrThrow(id);
    }
}