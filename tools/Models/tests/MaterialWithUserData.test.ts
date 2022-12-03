import {MaterialWithUserData} from "../MaterialWithUserData";
import {TestMaterialLogAPIResponse_bigger} from "../../../tests/Test Data";

export const testMaterial = new MaterialWithUserData(0, "Test", [], TestMaterialLogAPIResponse_bigger)

describe('MaterialWithUserData Tests', function () {
    it('should be instantiable', function () {
        expect(testMaterial).toBeInstanceOf(MaterialWithUserData);
    });
});