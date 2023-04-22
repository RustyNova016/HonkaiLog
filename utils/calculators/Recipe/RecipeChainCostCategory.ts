import {DataTable} from "@/utils/classes/ORM/DataTable";

export class RecipeChainCostCategory {
    private readonly primaryMaterialsAllowed: string[];

    constructor(primaryMaterialsAllowed: string[]) {
        this.primaryMaterialsAllowed = primaryMaterialsAllowed;
    }

    get id() {
        let out = "";
        this.primaryMaterialsAllowed.forEach(idMat => out += `${idMat}_`);
        return out;
    }
}

export class RecipeChainCostCategoryTable extends DataTable<RecipeChainCostCategory> {
    public create(materials: string[]) {
        const newCategory = new RecipeChainCostCategory(materials);
        this.insertOrThrow(newCategory);
    }
}