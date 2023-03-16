import {RecipeChainFinderStep_Table} from "@/utils/calculators/Recipe/ChainStep/RecipeChainFinderStep_Table";
import {MaterialInventory} from "@/utils/ORMEntities/Materials/inventory/MaterialInventory";
import {ChainFinder} from "@/utils/calculators/Recipe/ChainFinder";
import {RecipeDataTable} from "@/utils/ORMEntities/Recipes/RecipeDataTable";
import {CollectionOfUnique} from "@/utils/classes/CollectionOfUnique";
import {RecipeFinderAStar} from "@/utils/calculators/Recipe/Star/RecipeFinderAStar";
import {RecipeChainNode} from "@/utils/calculators/Recipe/Star/RecipeChainNode";

export class RecipeChainBuilder {
    public allRecipeChainSteps: RecipeChainFinderStep_Table;
    public finders: ChainFinder[] = [];
    public invTargetMaterials: MaterialInventory;
    public recipes: RecipeDataTable;

    constructor(invTargetMaterials: MaterialInventory, recipes: RecipeDataTable) {
        this.invTargetMaterials = invTargetMaterials;
        this.recipes = recipes;
        this.allRecipeChainSteps = new RecipeChainFinderStep_Table(this);

        //this.allRecipeChainSteps.insert(new RecipeChainFinderStep(this, new RecipeChain(this.recipes)));
    }

    public createFinders() {
        const primaryMaterials = this.recipes.getPrimaryMaterialsId();
        const whitelist = primaryMaterials.getPermutations();

        // TO DO: Make proper whitelist generator
        whitelist.forEach(primaryMat => this.finders.push(
            new ChainFinder(this, primaryMat)
        ));
    }

    public getAStarFinders() {
        const primaryMaterials = this.recipes.getPrimaryMaterialsId();
        const whitelist = primaryMaterials.getPermutations();

        // TO DO: Make proper whitelist generator
        return whitelist.map(primaryMat => new RecipeFinderAStar(new MaterialInventory(), primaryMat, this));
    }

    public getBestChains() {
        const bestChainsIds = new CollectionOfUnique<string>();

        this.createFinders();
        this.finders.forEach(finder => {
            console.log(`Processing:`, finder.allowedPrimaryMaterials);
            finder.processAll();
            finder.bestSteps.forEach(step => {console.log(step.id);});
            bestChainsIds.push(...finder.bestStepsIds);
        });

        return bestChainsIds.map(id => this.allRecipeChainSteps.getOrThrow(id));
    }

    public getBestChainsAStar() {
        const bestChainsIds: RecipeChainNode[] = [];

        this.getAStarFinders().forEach(finder => {
            console.log(`Processing:`, finder.minimizePrimaryMaterials);
            const bestNode = finder.getBestNode();
            console.log(bestNode.id);
            bestChainsIds.push(bestNode);
        });

        return bestChainsIds;
    }
}
