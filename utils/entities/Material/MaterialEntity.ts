import {MaterialLogCollection} from "@/utils/entities/Material/MaterialLogCollection";
import {MaterialRecipeDictionary} from "@/utils/entities/Material/Recipes/MaterialRecipeDictionary";
import {Material} from "@/utils/entities/Material/Material";
import {MaterialDictionary} from "@/utils/entities/Material/MaterialDictionary";

export class MaterialEntity {
    public id: string;
    public info?: Material //TODO: Check if id Match
    public history?: MaterialLogCollection; //TODO: Check if id Match
    private _recipes?: MaterialRecipeDictionary //TODO: Check if id Match

    constructor(id: string, public dictionary: MaterialDictionary | undefined = undefined) {
        this.id = id;
    }

    get recipes(): MaterialRecipeDictionary {
        if(this._recipes === undefined) {
            this._recipes = new MaterialRecipeDictionary()
        }
        return this._recipes;
    }
}

