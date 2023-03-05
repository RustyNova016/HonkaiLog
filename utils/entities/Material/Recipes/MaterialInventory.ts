import {Dictionary} from "@/utils/classes/Dictionary";
import {MaterialIdMap} from "@/utils/classes/MaterialIdMap";
import {idMaterial} from "@/utils/entities/Material/Material";
import {MaterialQuantityType} from "@/utils/entities/Material/MaterialQuantity";
import {InventoryOfItemWithId} from "@/utils/classes/ValueQuantities/InventoryOfItemWithId";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";

/** Collection of Material Quantities */
export class MaterialInventory extends MaterialIdMap<MaterialQuantityType> {
    get id(): string {
        let out = "";
        this.toValueArray() //TODO: Get only non null values
            .sort()
            .forEach(value => out += `${value.idMaterial}:${value.quantity}_`);
        return out;
    }

    public addToInventory(inventory: MaterialInventory) {
        for (const materialQuantity of inventory.toValueArray()) {
            const thisInvMat = this.get(materialQuantity.idMaterial);

            if (thisInvMat === undefined) {
                this.add(materialQuantity);
                continue;
            }
            thisInvMat.quantity = thisInvMat.quantity + materialQuantity.quantity;
            this.add(thisInvMat);
        }

        return this;
    }

    public override filterKeys(whitelist: idMaterial[]): MaterialInventory { //TODO: Make child class return this
        return new MaterialInventory().addMultiple(super.filterKeys(whitelist).toValueArray()) ;
    }

    public override get(key: string): MaterialQuantityType {
        const materialQuantity = super.get(key);
        if (materialQuantity === undefined) { return {idMaterial: key, quantity: 0}; }
        return materialQuantity;
    }

    getMaterialWithPositiveCounts(): MaterialInventory {
        const positiveCounts = [];

        for (const material of this.toValueArray()) {
            if (material.quantity > 0) {positiveCounts.push(material);}
        }

        return new MaterialInventory().addMultiple(positiveCounts);
    }

    getMaterialsNotIn(baseInventory: MaterialInventory) {
        const extraMaterials = [];

        for (const idMaterial of this.getNonNullMaterials().toKeyArray()) {
            let idInBaseInv = false;

            for (const idBaseMaterial of baseInventory.getNonNullMaterials().toKeyArray()) {
                if (idBaseMaterial === idMaterial) {idInBaseInv = true;}
            }

            if (!idInBaseInv) {extraMaterials.push(this.get(idMaterial));}
        }

        return extraMaterials;
    }

    public getNonNullMaterialIds(): string[] {
        return this.deepClone().removeNegativeOrZero().toKeyArray();
    }

    /** Return a copy of the inventory without materials with null quantities */
    public getNonNullMaterials(): MaterialInventory {
        return this.deepClone().removeNegativeOrZero();
    }

    /** Return true if this inventory as more items for each material than the one compared */
    public isEachMaterialSuperiorOrEdualTo(smallerInventory: MaterialInventory): boolean {
        const materialsToCheck = [...this.getNonNullMaterials().toKeyArray(), ...smallerInventory.getNonNullMaterials().toKeyArray()]

        for (const idMaterial of materialsToCheck) {
            const thisInvQuantity = this.get(idMaterial);
            const otherInvQuantity = smallerInventory.get(idMaterial);

            if (thisInvQuantity.quantity < otherInvQuantity.quantity) { return false; }
        }

        return true;
    }

    public makeNegativesZero(): this {
        return this.applyToEach((value) => {
            return {
                idMaterial: value.idMaterial,
                quantity: value.quantity < 0 ? 0 : value.quantity
            };
        });
    }

    public removeFromInventory(inventory: MaterialInventory) {
        for (const materialQuantity of inventory.toValueArray()) {
            const thisInvMat = this.get(materialQuantity.idMaterial);

            thisInvMat.quantity = thisInvMat.quantity - materialQuantity.quantity;
            this.add(thisInvMat);
        }

        return this;
    }

    removeNegativeOrZero(): this {
        this.makeNegativesZero();
        return this.removeNulls();
    }

    removeNulls(): this {
        for (const quantity of this.toValueArray()) {
            if (quantity.quantity === 0) {this.delete(quantity.idMaterial);}
        }

        return this;
    }

    toIdQuantityMap() {
        const out = new Dictionary<string, number>();

        for (const val of this.deepClone().removeNulls().toValueArray()) {
            out.set(val.idMaterial, val.quantity);
        }
        return out;
    }
}

export class MaterialInventoryV2 extends InventoryOfItemWithId<MaterialRecipe>{

}
