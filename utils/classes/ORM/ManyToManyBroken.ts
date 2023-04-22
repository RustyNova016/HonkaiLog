import {Dictionary} from "@/utils/classes/Dictionary";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

export class ManyToManyBroken extends Dictionary<string, CollectionOfUnique<string>> {
    public getOrCreate(id: string) {
        const getted = this.get(id);
        if (getted !== undefined) {return getted;}

        this.create(id);
        return this.getOrThrow(id);
    }

    public link(id1: string, id2: string) {
        this.addToId(id1, id2);
        this.addToId(id2, id1);
    }

    public unlink(id1: string, id2: string) {
        this.removeId(id1, id2);
        this.removeId(id2, id1);
    }

    private addToId(keyId: string, idToAdd: string) {
        this.getOrCreate(keyId).push(idToAdd);
    }

    private create(id: string) {
        this.set(id, new CollectionOfUnique<string>());
    }

    private removeId(keyId: string, idToAdd: string) {
        this.getOrCreate(keyId).remove(idToAdd);
    }
}