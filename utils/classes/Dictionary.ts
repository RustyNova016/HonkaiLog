import _ from "lodash";

export class Dictionary<key, value> extends Map<key, value> {
    public getOrThrow(key: key) {
        const obj = this.get(key);
        if (obj === undefined) {throw new Error("Cannot get value with key: " + key);}
        return obj;
    }

    public map<result = any>(fn: (value: value, key: key) => result): result[] {
        return Array.from(this, (v) => {
            return fn(v[1], v[0]);
        });
    }

    public toValueArray(): value[] {
        return this.map((val) => val);
    }

    public toKeyArray(): key[] {
        return this.map((_val, keyVal) => keyVal);
    }

    public clone(): this {
        return _.cloneDeep(this);
    }

    public override forEach(callbackfn: (value: value, key: key, map: Map<key, value>) => void, thisArg?: any) {
        super.forEach(callbackfn, thisArg);
        return this;
    }
}