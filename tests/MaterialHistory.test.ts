import {MaterialHistory} from "../tools/Database/MaterialHistory";
import {TestMaterialCountAPIResponse} from "./Test Data";

describe('MaterialHistory tests', function () {
    describe('Test with valid data', function () {
        it('should return a MaterialHistory object', function () {
            const materialHistory = new MaterialHistory(TestMaterialCountAPIResponse);
            expect(materialHistory).toBeInstanceOf(MaterialHistory);
        });
    });
});

