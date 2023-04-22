import {IdObjectDictionary} from "@/utils/classes/IdObjectDictionary";

import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

export type StepInventoryTableItem = { id: string, stepsIds: CollectionOfUnique<string> }

export class StepInventoryTable extends IdObjectDictionary<StepInventoryTableItem> {
    push(idStep: string) {

    }
}

