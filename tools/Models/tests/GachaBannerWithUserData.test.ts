import {MaterialWithUserData} from "../MaterialWithUserData";
import {testMaterial} from "./MaterialWithUserData.test";
import {GachaBannerWithUserData} from "../GachaBannerWithUserData";
import {__test_GachaBanner} from "./GachaBanner.test";
import {MaterialQuantityWithUserData} from "../MaterialQuantityWithUserData";

export const __test_GachaBannerWithUserData = new GachaBannerWithUserData(
    "test_GachaBannerWithUserData",
    __test_GachaBanner.nbPullsForGuaranty,
    __test_GachaBanner.nbGuarantyForCompletion,
    new MaterialQuantityWithUserData(testMaterial, 280, testMaterial.logCollection),
    0
)

describe('GachaBannerWithUserData tests', function () {
    it('should be instantiable', function () {
        expect(testMaterial).toBeInstanceOf(MaterialWithUserData);
    });
});