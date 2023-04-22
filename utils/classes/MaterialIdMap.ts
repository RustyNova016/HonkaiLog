import {IdentifierDictionary} from "@/utils/classes/IdentifierDictionary";
import {idMaterial} from "@/utils/entities/Material/Material";

export interface ObjectWithIdMaterial {
    idMaterial: idMaterial;
}

export class MaterialIdMap<objectWithId extends ObjectWithIdMaterial> extends IdentifierDictionary<idMaterial, objectWithId> {
    public getObjectIdentifier(val: objectWithId): idMaterial {
        return val.idMaterial;
    }

    public override getOrThrow(key: string) {
        const obj = this.get(key);
        if (obj === undefined) {throw new Error("Cannot get material with id: " + key);}
        return obj;
    }
}