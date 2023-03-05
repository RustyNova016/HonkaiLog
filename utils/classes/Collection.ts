export class Collection<T> extends Array<T> {
    filterAsNewCollection(filterFn: (value: T, index: number, array: T[]) => boolean) {
        return this.mapAsCollection((value, index, array) => {
            if (filterFn(value, index, array)) { return value; }
            return undefined;
        }).removeUndefined();
    }

    /** Insert elements at the provided index. Elements already in the array will be shifted */
    insertAt(index: number, value: T) {
        return this.splice(index, 0, value);
    }

    public includeOneOf(otherValues: T[]){
        return otherValues.some(otherValue => this.includes(otherValue))
    }

    public mapAsCollection<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Collection<U> {
        return new Collection<U>(...super.map(callbackfn, thisArg));
    }

    public remove(value: T) {
        const index = this.indexOf(value);
        if (index === -1) {return this}
        this.removeAt(index)
        return this
    }

    removeAt(index: number) {
        this.splice(index, 1);
        return this;
    }

    removeUndefined(): Exclude<T, undefined>[] {
        return this.filter((value: T | undefined): value is Exclude<T, undefined> => value !== undefined);
    }

    set(array: Array<T>): this {
        this.splice(0, this.length, ...array);
        return this;
    }
}

export function isUndefined(value: any): value is undefined {
    return value === undefined;
}

