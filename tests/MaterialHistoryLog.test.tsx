//import {MaterialHistory} from "../tools/Database/MaterialHistory";
//import {TestMaterialCountAPIResponse} from "./Test Data";
//import {MaterialHistoryLog} from "../tools/Database/MaterialHistoryLog";
//
//describe('MaterialHistoryLog tests', function () {
//    describe('Test with valid data', function () {
//        it('should return a MaterialHistoryLog object', function () {
//            const materialHistory = new MaterialHistoryLog(TestMaterialCountAPIResponse.Material_logs[0]);
//            expect(materialHistory).toBeInstanceOf(MaterialHistoryLog);
//        });
//
//        describe('Method tests', function () {
//            const log1 = new MaterialHistoryLog(TestMaterialCountAPIResponse.Material_logs[0]);
//            const log2 = new MaterialHistoryLog(TestMaterialCountAPIResponse.Material_logs[1]);
//
//            it("should return the oldest of the two logs", function () {
//                expect(log1.isOlderThan(log2)).toEqual(true);
//                expect(log2.isOlderThan(log1)).toEqual(false);
//            });
//
//            it("should return the correct delta", function () {
//                expect(log1.getChronologicalDelta(log2)).toEqual(1);
//                expect(log2.getChronologicalDelta(log1)).toEqual(1);
//            });
//        });
//    });
//});