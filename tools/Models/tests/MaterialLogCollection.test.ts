import {TestMaterialLogAPIResponse_bigger} from "../../../tests/Test Data";
import {MaterialWithLogs} from "../MaterialWithLogs";


describe('MaterialLogCollection tests', function () {
    describe('Tests with logs', function () {
        const testMaterial = new MaterialWithLogs(0, "Test", [], TestMaterialLogAPIResponse_bigger)

        describe('Calculations Tests', function () {
            it('should be able to give the number of day elapsed', function () {
                expect(testMaterial.logs.getTimeElapsed("days")).toEqual(3)
            });

            it('should be able to give the average material count', function () {
                expect(testMaterial.logs.calcAvgGain()).toEqual(100)
            });
        });
    });
});