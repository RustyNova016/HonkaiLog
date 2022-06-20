import {MaterialHistoryLog} from "../tools/Database/MaterialHistoryLog";
import {TestMaterialCountAPIResponse} from "./Test Data";
import {MaterialHistoryLogCollection} from "../tools/Database/MaterialHistoryLogCollection";

describe('MaterialHistoryLogCollection tests', function () {
    const log1 = new MaterialHistoryLog(TestMaterialCountAPIResponse.materialLogs[0]);
    const log2 = new MaterialHistoryLog(TestMaterialCountAPIResponse.materialLogs[1]);
    it('should return a MaterialHistoryLog object', function () {
        const materialHistory = new MaterialHistoryLogCollection([log1, log2]);
        expect(materialHistory).toBeInstanceOf(MaterialHistoryLogCollection);
    });

    it("should refuse an empty array", function () {
        expect(() => new MaterialHistoryLogCollection([])).toThrow();
    })

    describe('Method tests', function () {
        it('should return a MaterialHistoryLog array from a DB response', function () {
            const materialHistory = MaterialHistoryLogCollection.DBResponseToLogCollection(TestMaterialCountAPIResponse.materialLogs);
            expect(materialHistory).toEqual([log1, log2]);
        });
    });
});