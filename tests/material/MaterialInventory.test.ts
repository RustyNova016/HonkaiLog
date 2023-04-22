export const lol = "lol"
//import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
//
//const baseInventory = new MaterialInventory().add({idMaterial: "A", quantity: 5})
//const sameInventory = new MaterialInventory().add({idMaterial: "A", quantity: 5})
//const smallerInventory = new MaterialInventory().add({idMaterial: "A", quantity: 2})
//const biggerInventory = new MaterialInventory().add({idMaterial: "A", quantity: 10})
//const sameWithMoreMatsInventory = new MaterialInventory().add({idMaterial: "A", quantity: 5})
//    .add({idMaterial: "B", quantity: 9})
//
//
//describe('MaterialInventory Tests', function () {
//    it('should know its the same', function () {
//        expect(baseInventory.isEqual(sameInventory)).toBe(true)
//        expect(baseInventory.isEqual(smallerInventory)).toBe(false)
//        expect(baseInventory.isEqual(biggerInventory)).toBe(false)
//        expect(baseInventory.isEqual(sameWithMoreMatsInventory)).toBe(false)
//    });
//
//    it('should when its superior', function () {
//        expect(baseInventory.isStrictlySuperiorTo(sameInventory)).toBe(false)
//        expect(baseInventory.isStrictlySuperiorTo(smallerInventory)).toBe(true)
//        expect(baseInventory.isStrictlySuperiorTo(biggerInventory)).toBe(false)
//        expect(baseInventory.isStrictlySuperiorTo(sameWithMoreMatsInventory)).toBe(false)
//    });
//});