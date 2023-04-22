import {Dictionary} from "@/utils/classes/Dictionary";

export abstract class IdentifierDictionary<id, value> extends Dictionary<id, value> {

    public addMultiple(value: value[]) {
        value.map((value) => this.add(value));
        return this;
    }

    public add(value: value) {
        this.set(this.getObjectIdentifier(value), value);
        return this;
    }

    public abstract getObjectIdentifier(val: value): id

    public override getOrThrow(key: id) {
        const obj = this.get(key);
        if (obj === undefined) {throw new Error("Cannot get object with id: " + key);}
        return obj;
    }
}

