import {Collection} from "@/utils/classes/Collection";

/** Collection of unique values */
export class CollectionOfUnique<T> extends Collection<T> {
    public override push(...items: T[]): number {
        const actualPush = items.filter((item: T) => !this.includes(item))
        return super.push(...actualPush);
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