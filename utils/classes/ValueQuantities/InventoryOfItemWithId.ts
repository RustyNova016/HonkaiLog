import {IdObjectDictionary, ObjectWithId} from "@/utils/classes/IdObjectDictionary";
import {QuantityOfObjectWithId} from "@/utils/classes/ValueQuantities/QuantityOfObjectWithId";
import {Dictionary} from "@/utils/classes/Dictionary";

export class InventoryOfItemWithId<obj extends ObjectWithId> extends IdObjectDictionary<QuantityOfObjectWithId<obj>> {
    get id(): string {
        let out = "";
        this.toValueArray() //TODO: Get only non null values
            .sort()
            .forEach(value => out += `${value.id}:${value.quantity}_`);
        return out;
    }

    /** Add an item to the count. */
    public push(value: obj) {
        const prevCount = this.get(value.id);
        if(prevCount === undefined) {
            this.add(new QuantityOfObjectWithId<obj>(undefined, value))
            return this
        }

        prevCount.quantity = prevCount.quantity + 1
        return this
    }

    public toIDQuantityDictionary() {
        const out = new Dictionary<string, number>()

        this.forEach(value => out.set(value.id, value.quantity))

        return out
    }
}
