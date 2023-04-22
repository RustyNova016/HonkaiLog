import {MaterialDictionary} from "@/utils/entities/Material/MaterialDictionary";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";

export class MaterialDataEntity {
    materialDictionary = new MaterialDictionary();
    materialRecipes = new RecipeDataTable();
}