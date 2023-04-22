import {IdentifierDictionary} from "@/utils/classes/IdentifierDictionary";

export type ObjectWithId = {
    id: string;
}

export class IdObjectDictionary<objectWithId extends ObjectWithId> extends IdentifierDictionary<string, objectWithId> {
    public getObjectIdentifier(val: objectWithId): string {
        return val.id;
    }
}