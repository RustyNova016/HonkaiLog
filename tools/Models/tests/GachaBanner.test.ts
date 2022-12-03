import {testMaterial} from "./MaterialWithUserData.test";
import {MaterialWithUserData} from "../MaterialWithUserData";
import {GachaBanner} from "../GachaBanner";
import {MaterialQuantity} from "../MaterialQuantity";

export const __test_GachaBanner = new GachaBanner(
    "__test_GachaBanner",
    100,
    100,
    new MaterialQuantity(testMaterial, 280)
)

describe('GachaBanner Tests', function () {
    it('should be instantiable', function () {
        expect(__test_GachaBanner).toBeInstanceOf(GachaBanner);
    });
});