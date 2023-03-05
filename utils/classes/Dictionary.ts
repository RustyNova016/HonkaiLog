import _ from "lodash";
import {Collection} from "@/utils/classes/Collection";

export class Dictionary<key, value> extends Map<key, value> {
    public applyToEach(fn: (value: value, key: key) => value): this {
        this.toKeyArray().forEach(keyGiven => this.set(keyGiven, fn(this.getOrThrow(keyGiven), keyGiven)));
        return this;
    }

    public cloneShallow(): this {
        return _.clone(this);
    }

    public deepClone(): this {
        return _.cloneDeep(this);
    }

    /** Filter into a new collection */
    public filter(fn: (keyValue: [key, value]) => boolean) {
        return new Dictionary(this.toArray().filter(fn));
    }

    public filterKeys(whitelist: key[]) {
        const validEntries: [key, value][] = [];

        for (const keyEle of whitelist) {
            const value = this.get(keyEle);
            if (value === undefined) {continue;}
            validEntries.push([keyEle, value]);
        }

        return new Dictionary(validEntries);
    }

    /** Filter values into a new collection */
    public filterValues(fn: (keyValue: value) => boolean): Dictionary<key, value> {
        return this.filter((val) => fn(val[1]));
    }

    public override forEach(callbackfn: (value: value, key: key, map: Map<key, value>) => void, thisArg?: any) {
        super.forEach(callbackfn, thisArg);
        return this;
    }

    public getOrThrow(key: key): value {
        const obj = this.get(key);
        if (obj === undefined) {throw new Error("Cannot get value with key: " + key);}
        return obj;
    }

    /** Return true if the two dictionary have the same keys, and the same values for those keys */
    public isEqual(otherDictionary: Dictionary<key, value>): boolean {
        return _.isEqual(this, otherDictionary);
    }

    /** Return true if the key of this dictionary have the same values as the other's */
    public isEqualLeftJoin(otherDictionary: Dictionary<key, value>): boolean {
        for (const [thisEleKey, thisEle] of this) {
            if (!_.isEqual(thisEle, otherDictionary.get(thisEleKey))) {return false;}
        }
        return true;
    }

    public map<result = any>(fn: (value: value, key: key) => result): Collection<result> {
        return new Collection(...Array.from(this, (v) => {
            return fn(v[1], v[0]);
        }));
    }

    public merge(otherDictionary: Dictionary<key, value>, overwrite = false) {
        for (const otherDictionaryElement of otherDictionary) {
            if (!overwrite && this.get(otherDictionaryElement[0]) !== undefined) {
                continue
            }
            this.set(otherDictionaryElement[0], otherDictionaryElement[1])
        }
    }

    toArray() {
        return [...this.entries()];
    }

    toJSON() {
        return JSON.stringify(this.toObject());
    }

    public toKeyArray(): key[] {
        const keys: key[] = [];
        for (const dictionaryElement of this) {
            keys.push(dictionaryElement[0]);
        }
        return keys;
    }

    public toObject() {
        return Object.fromEntries(this);
    }

    /** Return all that values into a new array */
    public toValueArray(): Collection<value> {
        return this.map((val) => val);
    }

    public toValueArraySortedByKey(): value[] {
        return this.toArray().sort().map(val => val[1]);
    }
}

