import {DataTable} from "@/utils/classes/ORM/DataTable";
import {Dictionary} from "@/utils/classes/Dictionary";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

export class OneToMany<leftTable extends DataTable<any>, rightTable extends DataTable<any>> extends Dictionary<string, CollectionOfUnique<string>> {
    constructor(private readonly _leftDataTable: leftTable | undefined = undefined, private readonly _rightDataTable: rightTable | undefined = undefined) {super();}

    public link(keyId: string, idToAdd: string) {
        this.getOrCreate(keyId).push(idToAdd);
    }

    private create(id: string) {
        this.set(id, new CollectionOfUnique<string>());
    }

    public unlink(keyId: string, idToAdd: string) {
        this.getOrCreate(keyId).remove(idToAdd);
    }

    public getOrCreate(id: string) {
        const getted = this.get(id);
        if (getted !== undefined) {return getted;}

        this.create(id);
        return this.getOrThrow(id);
    }

    public getItemsRight(id: string) {
        for (const item of this.toArray()) {
            if(item[1].includes(id)) {return item[0]}
        }
        return
    }
}