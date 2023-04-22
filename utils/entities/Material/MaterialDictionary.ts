import {IdObjectDictionary} from "@/utils/classes/IdObjectDictionary";
import {MaterialEntity} from "@/utils/entities/Material/MaterialEntity";
import {MaterialRecipeDictionary} from "@/utils/entities/Material/Recipes/MaterialRecipeDictionary";
import {MaterialInfo} from "@/utils/types/materials/MaterialInfo";

/** Map of each material */
export class MaterialDictionary extends IdObjectDictionary<MaterialEntity> {
    addData(data: MaterialInfo) {
        if (data.material !== undefined) {

        }
    }

    public override get(key: string): MaterialEntity {
        const materialEntity = super.get(key);

        //If undefined, you add a new material entity with this key
        if (materialEntity === undefined) {
            this.add(new MaterialEntity(key, this));
            return this.get(key)
        }
        return materialEntity;
    }

    public insertRecipes(recipes: MaterialRecipeDictionary) {
        for (const recipe of recipes.toValueArray()) {
            for (const idMaterials of recipe.materialProduced.toKeyArray()) {
                this.get(idMaterials).recipes.add(recipe)
            }
        }
    }

    public insertData(data: MaterialInfo) {
        if(data.recipes !== undefined) {
            this.get(data.idMaterials).recipes.addFromJson(data.recipes)
        }
    }
}