import {Dictionary} from "@/utils/classes/Dictionary";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

/** Table where ids are mapped to a boolean */
export class IdChecklist extends Dictionary<string, boolean> {
    private _falseValues = new CollectionOfUnique<string>();
    private _trueValues = new CollectionOfUnique<string>();

    get falseValues() {
        return this._falseValues;
    }

    get trueValues() {
        return this._trueValues;
    }

    public override set(key: string, value: boolean): this {
        if (value) {
            this._trueValues.push(key);
            this._falseValues.remove(key);
        } else {
            this._trueValues.remove(key);
            this._falseValues.push(key);
        }

        return super.set(key, value);
    }

    public setIfNew(id: string, status: boolean) {
        if (this.get(id) === undefined) { this.set(id, status); }
    }

    public ifNew(id: string, valueIfNew: boolean, valueElse: boolean){
        if (this.get(id) === undefined) { this.set(id, valueIfNew); }
        else {this.set(id, valueElse);}
    }

    /** Bump an id to be the first in the array */
    public bumpId(id: string){
        if(!this.isSet(id)){return}
        const arrayContainingId = this.getOrThrow(id)? this.falseValues: this.trueValues
        arrayContainingId.remove(id);
        arrayContainingId.push(id)
    }
}