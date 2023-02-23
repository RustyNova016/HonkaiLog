import {Dictionary} from "@/utils/classes/Dictionary";

export interface ObjectWithIdMaterial {
    idMaterial: string
}

export class MaterialIdMap<objectWithId extends ObjectWithIdMaterial> extends Dictionary<string, objectWithId>{
    public addMultiple(value: objectWithId[]){
        value.map((value) => this.add(value))
        return this
    }

    public add(value: objectWithId) {
        this.set(value.idMaterial, value)
        return this
    }

    public override getOrThrow(key: string) {
        const obj = this.get(key);
        if(obj === undefined) {throw new Error("Cannot get material with id: " + key)}
        return obj
    }
}