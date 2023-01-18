export const lol = "lol"


/*
import {GachaBanner} from "../tools/Models/GachaBanner";
import {MaterialCollection} from "../tools/Models/MaterialCollection";
import {MaterialQuantity} from "../tools/Models/MaterialQuantity";
import {APIRoutes} from "../data/API routes";

APIRoutes.logs = "http://localhost:3000/api/material/"
APIRoutes.materialLogs = "http://localhost:3000/api/material/logs/"

async function getDormCard() {
    return await MaterialCollection.getCollection().findMaterialById(2);
}

async function getPullCost() {
    return new MaterialQuantity(await getDormCard(), 280)
}

async function getCharacterBanner(): Promise<GachaBanner> {
    return new GachaBanner("Character Banner", 100, 1, await getPullCost());
}

describe('GachaBanner tests', function () {
    it('should be instantiable', async function () {
        const gacha = new GachaBanner("Test", 100, 1, await getPullCost())
        expect(gacha).toBeInstanceOf(GachaBanner);
    })
    0
    describe('Method Tests', function () {
        it('should give the cost of completion', async function () {
            const characterBanner = await getCharacterBanner();
            const materialQuantity = new MaterialQuantity(await getDormCard(), 28000);
            expect(characterBanner.getCostToCompletion()).toEqual(materialQuantity)
        });
    });
});
*/
