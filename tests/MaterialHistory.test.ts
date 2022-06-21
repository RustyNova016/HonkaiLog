import {MaterialHistory} from "../tools/Database/MaterialHistory";
import {TestMaterialCountAPIResponse, TestMaterialCountAPIResponse_NoLogs} from "./Test Data";

describe('MaterialHistory tests', function () {
    it('should return a MaterialHistory object', function () {
        expect(new MaterialHistory(TestMaterialCountAPIResponse)).toBeInstanceOf(MaterialHistory);
        expect(new MaterialHistory(TestMaterialCountAPIResponse_NoLogs)).toBeInstanceOf(MaterialHistory);
    });
});

