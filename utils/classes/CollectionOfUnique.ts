import {Collection} from "@/utils/classes/Collection";

/** Collection of unique values */
export class CollectionOfUnique<T> extends Collection<T> {
    public override push(...items: T[]): number {
        items.forEach(item => this.pushOne(item))
        return 1
    }

    public pushOne(item: T) {
        if(this.includes(item)){return 0}
        return super.push(item);
    }

    public override filter(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any) {
        return new CollectionOfUnique(...super.filter(predicate, thisArg))
    }

    public addOrRemove(item: T, keep: boolean) {
        if (keep){
            this.push(item)
            return this
        }

        this.remove(item)
        return this
    }
}
