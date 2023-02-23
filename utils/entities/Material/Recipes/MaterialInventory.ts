import {MaterialIdMap} from "@/utils/classes/MaterialIdMap";
import {MaterialQuantityType} from "@/utils/entities/Material/MaterialQuantity";

/** Collection of Material Quantities */
export class MaterialInventory extends MaterialIdMap<MaterialQuantityType> {
    public addToInventory(inventory: MaterialInventory) {
        for (const materialQuantity of inventory.toValueArray()) {
            const thisInvMat = this.get(materialQuantity.idMaterial);

            if (thisInvMat === undefined) {
                this.add(materialQuantity);
                continue;
            }
            thisInvMat.quantity = thisInvMat.quantity + materialQuantity.quantity;
            this.add(thisInvMat)
        }

        return this;
    }

    /** Return true if this inventory as more items for each material than the one compared */
    public hasMoreMaterialsThan(inventory: MaterialInventory): boolean {
        for (const materialQuantity of inventory.toValueArray()) {
            const thisInvQuantity = this.get(materialQuantity.idMaterial);

            if (thisInvQuantity !== undefined && materialQuantity.quantity > thisInvQuantity.quantity) { return false; }
        }

        return true;
    }

    public removeFromInventory(inventory: MaterialInventory, allowNegatives: boolean = false) {
        if (!this.hasMoreMaterialsThan(inventory) && !allowNegatives) {throw new Error("Cannot remove from inventory");}

        for (const materialQuantity of inventory.toValueArray()) {
            const thisInvMat = this.get(materialQuantity.idMaterial);

            thisInvMat.quantity = thisInvMat.quantity - materialQuantity.quantity;
        }

        return this;
    }

    public override get(key: string): MaterialQuantityType {
        const materialQuantity = super.get(key);
        if(materialQuantity === undefined) { return {idMaterial: key, quantity: 0} }
        return materialQuantity;
    }

    public makeNegativesZero(): this {
        return this.applyToEach((value) => {return {
            idMaterial: value.idMaterial,
            quantity: value.quantity < 0? 0 : value.quantity
        }})
    }
}