import {ObjectWithId} from "@/utils/classes/IdObjectDictionary";

export class QuantityOfObjectWithId<obj extends ObjectWithId> {
    public id: string = "";
    public quantity: number = 0
    public value: obj | undefined;

    public getValueOrthrow(){
        if(this.value === undefined) {throw new Error("Value is undefined")}
        return this.value
    }

    constructor(id: string | undefined = undefined, value: obj | undefined = undefined, quantity: number = 0) {
        this.setIdAndValue(value, id)
        this.quantity = quantity
    }

    public setIdAndValue(value: obj | undefined = undefined, id: string | undefined) {
        if (id === undefined) {
            if (value === undefined) {throw new Error("Error: You must initialize the id or the value")}
            this.id = value.id
            this.value = value
            return;
        }

        this.id = id;
        this.value = value;
    }
}