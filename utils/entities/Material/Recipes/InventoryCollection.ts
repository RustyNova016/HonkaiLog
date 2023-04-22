import {MaterialQuantityType} from "@/utils/entities/Material/MaterialQuantity";
import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";

export class InventoryCollection {
    public collection: MaterialInventory[] = [];

    public getInventoriesWithLowestOf(idMaterials: string): MaterialInventory[] {
        const lowest = this.getLowestOf(idMaterials);
        if (lowest === undefined) {return [];}
        const result = [];

        for (const materialInventory of this.collection) {
            if (materialInventory.get(idMaterials).quantity === lowest.quantity) { result.push(materialInventory);}
        }

        return result;
    }

    public getLowestOf(idMaterials: string): MaterialQuantityType | undefined {
        let lowest: MaterialQuantityType | undefined;

        for (const invs of this.collection) {
            const materialQuantityType = invs.get(idMaterials);
            if (lowest === undefined || lowest?.quantity < materialQuantityType.quantity) {
                lowest = materialQuantityType;
            }
        }

        return lowest;
    }
}