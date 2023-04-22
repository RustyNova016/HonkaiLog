export const lol = "lol"

//import {MaterialDataEntity} from "@/utils/entities/MaterialDataEntity";
//import {TierIVElecMatRecipes} from "./Test_Recipes";
//import {TwelveTierIV} from "../../data/MateriaRecipeTest";
//import {Dictionary} from "@/utils/classes/Dictionary";
//import {RecipeChainCalculatorStepOld} from "@/utils/entities/Material/Recipes/recipeChain/RecipeChainCalculatorStepOld";
//
//const materialData = new MaterialDataEntity();
//materialData.materialRecipes.addFromJson(TierIVElecMatRecipes)
//
//describe('RecipeChainCalculator Tests', function () {
//    it('should create a calculator', function () {
//        const recipeCalculator = materialData.materialRecipes.createChainCalculatorForInventory(TwelveTierIV)
//        expect(recipeCalculator).not.toBe(undefined)
//    });
//
//
//    describe('Recipe Chain Processing Tests', function () {
//        it('should be able to get th the best completions', function () {
//            const recipeCalculator = materialData.materialRecipes.createChainCalculatorForInventory(TwelveTierIV)
//            recipeCalculator.generatePossibleChainsDepthFirst()
//            expect(recipeCalculator.completedPaths).toBeGreaterThan(0)
//        });
//
//        describe('Inferior steps test', function () {
//            const recipeCalculator = materialData.materialRecipes.createChainCalculatorForInventory(TwelveTierIV)
//
//            const get = (buying: number, hoard: number, mirage: number) => {
//                const recipeQuantity = new Dictionary<string, number>()
//                    .set("BuyingWithEtherfuel", buying)
//                    .set("MirageFlour7", mirage)
//                    .set("MirageFlour7WithHoard", hoard)
//
//                return recipeCalculator.getStepFromRecipeQuantities(recipeQuantity)
//            }
//
//            const isStepInferior = (inferiorStep: RecipeChainCalculatorStepOld, superiorStep: RecipeChainCalculatorStepOld) => {
//                return inferiorStep.isInferiorThan(superiorStep) !== ""
//            }
//
//            const isInferiorToOne = (inferiorStep: RecipeChainCalculatorStepOld, superiorSteps: RecipeChainCalculatorStepOld[]) => {
//                for (const superiorStep of superiorSteps) {
//                    if(isStepInferior(inferiorStep, superiorStep)) { return true}
//                }
//                return false
//            }
//
//            const invite2_pass100 = get(2, 1, 1);
//            const invite2_pass200 = get(1, 2, 0);
//            const invite2_pass200_alt1 = get(2, 2, 0);
//            const invite3_pass100 = get(1, 1, 2);
//            const invite3_pass200 = get(1, 2, 1);
//            const invite5 = get(2, 0, 5);
//            const invite5_alt1 = get(3, 0, 5);
//
//            it('should say if the step is inferior', function () {
//                expect(isStepInferior(invite3_pass200, invite3_pass100)).toBe(true)
//                expect(isStepInferior(invite3_pass200, invite2_pass200)).toBe(true)
//
//                expect(isStepInferior(invite2_pass200_alt1, invite2_pass200)).toBe(true)
//                expect(isStepInferior(invite5_alt1, invite5)).toBe(true)
//            });
//
//            it("should say when the step isn't inferior", function () {
//                expect(isStepInferior(invite2_pass200, invite3_pass100)).toBe(false)
//
//                expect(isStepInferior(invite2_pass200, invite2_pass200_alt1)).toBe(false)
//                expect(isStepInferior(invite5, invite5_alt1)).toBe(false)
//
//                expect(isInferiorToOne(invite5, [invite2_pass100, invite2_pass200, invite2_pass200_alt1, invite3_pass100, invite3_pass200, invite5])).toBe(false)
//                expect(isInferiorToOne(invite2_pass100, [invite2_pass100, invite2_pass200, invite2_pass200_alt1, invite3_pass100, invite3_pass200, invite5])).toBe(false)
//            });
//        });
//    });
//});
//
//