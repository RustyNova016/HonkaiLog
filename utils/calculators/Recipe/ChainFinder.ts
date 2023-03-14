import {RecipeChainBuilder} from "@/utils/calculators/Recipe/RecipeChainBuilder";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";

import {RecipeChainFinderStep} from "@/utils/calculators/Recipe/ChainStep/RecipeChainFinderStep";
import {IdChecklist} from "@/utils/classes/ORM/IdChecklist";
import {Dictionary} from "@/utils/classes/Dictionary";

export interface ChainFinderInterface {
    /** Primary Materials allowed in the final chain */
    allowedPrimaryMaterials: string[];
}

export class ChainFinder implements ChainFinderInterface {
    public allowedPrimaryMaterials: string[];
    public bestStepsIds = new CollectionOfUnique<string>();
    private builder: RecipeChainBuilder;
    private hasExploredChain = new IdChecklist();
    private truthTable = new CollectionOfUnique<string>()

    constructor(builder: RecipeChainBuilder, allowedPrimaryMaterials: string[]) {
        this.allowedPrimaryMaterials = allowedPrimaryMaterials;
        this.builder = builder;
        this.truthTable.push(...dat)

        this.unexploredChains.push(...this.builder.allRecipeChainSteps.getAllIrreducible().map(val => val.id));
        this.unexploredChains.push(...this.builder.allRecipeChainSteps.getAllAwaitingChild().map(val => val.id));
        if(this.unexploredChains.length === 0) {this.unexploredChains.push(this.builder.allRecipeChainSteps.getOrThrow('').id);}
    }

    get allRecipeChainSteps() {return this.builder.allRecipeChainSteps;}

    get bestSteps() {return this.bestStepsIds.map(id => this.getOrThrow(id));}

    private get unexploredChains() {
        return this.hasExploredChain.falseValues;
    }

    getOrThrow(idStep: string) {return this.allRecipeChainSteps.getOrThrow(idStep);}

    handlePotentialBestStep(idStep: string) {
        this.bestStepsIds.push(idStep);
        this.cleanupBestSteps();
    }

    processAll() {
        while (this.unexploredChains.length !== 0) {
            this.processStep(this.unexploredChains.at(0) as string);
        }
    }

    private cleanupBestSteps() {
        for (const bestStep of this.bestSteps) {
            if (this.bestSteps.some(againstBestStep => bestStep.isWorse(againstBestStep, this))) {
                this.bestStepsIds.remove(bestStep.id);
            }
        }
    }

    private debugTruthTable(worseStep: RecipeChainFinderStep | undefined, betterStep: RecipeChainFinderStep | undefined) {
        if(betterStep === undefined) { return}
        if (worseStep === undefined) {return;}

        let id = "";
        id += betterStep.isIrreducible ? 1 : 0;
        id += worseStep.isIrreducible ? 1 : 0;

        id += betterStep.recipeChain.totalNumberOfItems > worseStep.recipeChain.totalNumberOfItems ? 1 : 0;
        id += worseStep.recipeChain.totalNumberOfItems > betterStep.recipeChain.totalNumberOfItems ? 1 : 0;

        id += betterStep.invPrimaryMatsToReduce.isSuperiorByAtLeastOne(worseStep.invPrimaryMatsToReduce) ? 1 : 0;
        id += worseStep.invPrimaryMatsToReduce.isSuperiorByAtLeastOne(betterStep.invPrimaryMatsToReduce) ? 1 : 0;

        id += betterStep.invIntermediaryMaterialsToReduce.isSuperiorByAtLeastOne(worseStep.invIntermediaryMaterialsToReduce) ? 1 : 0;
        id += worseStep.invIntermediaryMaterialsToReduce.isSuperiorByAtLeastOne(betterStep.invIntermediaryMaterialsToReduce) ? 1 : 0;

        id += betterStep.invFinalMatsToReduce.isSuperiorByAtLeastOne(worseStep.invFinalMatsToReduce) ? 1 : 0;
        id += worseStep.invFinalMatsToReduce.isSuperiorByAtLeastOne(betterStep.invFinalMatsToReduce) ? 1 : 0;


        if (!this.truthTable.includes(id)) {
            console.log(`Worse: ${worseStep.id} vs Better:${betterStep.id}`);

            console.log(id, ">",
                        betterStep.id === "BuyingWithEtherfuel:4_MirageFlour7WithHoard:1_"? true:
                            worseStep.id === "BuyingWithEtherfuel:4_MirageFlour7WithHoard:1_"? false:
                            betterStep.id === ""? false:
                                worseStep.id === ""? true:
                            null
            );
            this.truthTable.push(id);
            console.log(
                "Best.ir", betterStep.isIrreducible, " \n",
                "Worse.ir", worseStep.isIrreducible, " \n",
                "Best.step>", betterStep.recipeChain.totalNumberOfItems > worseStep.recipeChain.totalNumberOfItems, " \n",
                "Worse.step>", worseStep.recipeChain.totalNumberOfItems > betterStep.recipeChain.totalNumberOfItems, " \n",
                "Best.primary", betterStep.invPrimaryMatsToReduce.isSuperiorByAtLeastOne(worseStep.invPrimaryMatsToReduce), "\n",
                "Worse.primary", worseStep.invPrimaryMatsToReduce.isSuperiorByAtLeastOne(betterStep.invPrimaryMatsToReduce), "\n",
                'Best.inter', betterStep.invIntermediaryMaterialsToReduce.isSuperiorByAtLeastOne(worseStep.invIntermediaryMaterialsToReduce), " \n",
                "Worse.inter", worseStep.invIntermediaryMaterialsToReduce.isSuperiorByAtLeastOne(betterStep.invIntermediaryMaterialsToReduce), " \n",
                "Best.finals", betterStep.invFinalMatsToReduce.isSuperiorByAtLeastOne(worseStep.invFinalMatsToReduce), " \n",
                "Worse.finals", worseStep.invFinalMatsToReduce.isSuperiorByAtLeastOne(betterStep.invFinalMatsToReduce), " \n",
            );
            const a = 1
        }
    }

    /** Check if the step has valid primary material */
    public isStepValid(step: RecipeChainFinderStep): boolean {
        return !step.invPrimaryMatsToReduce.toKeyArray().some(primaryMat => !this.allowedPrimaryMaterials.includes(primaryMat));
    }

    /** Look at the step data, look if irreducible, and set it children to be processed */
    private processStep(idStep: string) {
        this.hasExploredChain.set(idStep, true);
        //console.log("Processing Step:    ", idStep);
        const step = this.builder.allRecipeChainSteps.getOrThrow(idStep);
        //console.log("ir:", step.isIrreducible, "fit:", this.isStepValid(step), "chIr:", step.hasAllChildrenBranchesIrreducible, "worse:", this.stepWorseThanBests(step));

        //this.debugTruthTable(this.builder.allRecipeChainSteps.get(""), step);
        //this.debugTruthTable(step, this.builder.allRecipeChainSteps.get("BuyingWithEtherfuel:4_MirageFlour7WithHoard:1_"));
        //this.debugTruthTable(this.builder.allRecipeChainSteps.get("BuyingWithEtherfuel:2_MirageFlour7:5_"), step);
        //this.debugTruthTable(step, this.builder.allRecipeChainSteps.get("BuyingWithEtherfuel:2_MirageFlour7:5_"));

        //console.log(idStep, "- valid:", this.isStepValid(step), "- Irreductible:", step.isIrreducible, "- Optimized:", step.isOptimizedChild(), "- Children:", step.canHaveChildrenInFinder(this))
        //step.debug_log(this)

        // If the step isn't valid, then ignore it
        //if (!this.isStepValid(step)) {return;}

        // If the step is irreducible, then potentially make it the best chain
        if (step.isIrreducible) {this.handlePotentialBestStep(step.id);}

        // If the step isn't the most optimized, then don't add the children. //TODO: Maybe put it before checking the best step?
        if (!step.isOptimizedChild()) {return}

        // If the step's children aren't worth searching, then don't add them to the search list
        if (!step.shouldExploreChildren(this)) {return;}

        console.log("Setting children to search:", step.recipeChain.totalNumberOfItems, idStep);
        step.children.forEach(step => {
            this.hasExploredChain.setIfNew(step.id, false); // Remove the old values to bump it higher on the
                                                            // unexplored list
            //this.hasExploredChain.bumpId(step.id);
        });
    }

    public stepWorseThanBests(step: RecipeChainFinderStep) {
        return this.bestSteps.some(againstBestStep => step.isWorse(againstBestStep, this));
    }
}

const dat = ["0000000000", "0010001001", "0010100101", "0010101001", "1010100101", "1010001001", "1010000101", "1110011000", "1110011010", "1000100101",
"1100000000", "1100011010", "1100000101", "1000001001", "1001100101", "1001000110", "1001000101", "1101011010", "1101000101", "1110001010", "1101100101", "1101001000", "1101100100",
    "0100011010", "0100001001", "1000000110", "1000000101", "1001001001", "0101000110", "1101010110", "1100001001", "1100000110", "1100001010", "1100100101", "11010010101", "0110011010",
    "0110001001", "1001010110", "1110001001", "1101000110", "1001000100", "1010100001", "1010011001", "1000000101", "1101010110", "1001010110", "1001000100", "1010011001", "1000000101", "1001001001",
    ""
//, //"1101000101"
    //, "0101001010"
]

type stepData = {
    isValid: boolean,
    isIrreductible: boolean,
    isOptimized: boolean,
    makeChildren: boolean;
}

export class ChainFinder_Debug {
    private data = new Dictionary<string, stepData>()

    constructor() {
        this.data.set()
    }


    static check(finder: ChainFinder, step: RecipeChainFinderStep)
}