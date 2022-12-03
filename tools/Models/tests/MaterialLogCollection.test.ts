import {TestMaterialLogAPIResponse_bigger} from "../../../tests/Test Data";
import {MaterialWithUserData} from "../MaterialWithUserData";


describe('MaterialLogCollection tests', function () {
    describe('Tests with logs', function () {
        const testMaterial = new MaterialWithUserData(0, "Test", [], TestMaterialLogAPIResponse_bigger)

        describe('Calculations Tests', function () {
            it('should be able to give the number of day elapsed', function () {
                expect(testMaterial.logCollection.getTimeElapsed("days")).toEqual(3)
            });

            it('should be able to give the average material count', function () {
                expect(testMaterial.logCollection.calcAvgGain()).toEqual(100)
            });
        });
    });
});