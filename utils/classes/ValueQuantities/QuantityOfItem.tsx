export class QuantityOfObject<obj> {
    public value: obj;
    public quantity: number;

    constructor(value: obj, quantity: number) {
        this.value = value;
        this.quantity = quantity;
    }
}

