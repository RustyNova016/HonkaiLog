import {Material} from "@/utils/entities/Material/Material";
import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {MaterialRecipe} from "@/utils/entities/Material/Recipes/MaterialRecipe";
import {MaterialRecipeCollection} from "@/utils/entities/Material/Recipes/MaterialRecipeCollection";

const ticket = new Material("ticket", "Ticket");
const tierIV = new Material("TierIV", "Tier IV");

export const tierIVRecipe = new MaterialRecipe(
    new MaterialInventory().addMultiple([{
        idMaterial: "ticket",
        quantity: 1
    }]),
    new MaterialInventory().addMultiple([{
        idMaterial: "TierIV",
        quantity: 6
    }])
);

export const TwelveTierIV = new MaterialInventory().addMultiple([{
        idMaterial: "TierIV",
        quantity: 12
    }])

export const tierIVWithIIIRecipe = new MaterialRecipe(
    new MaterialInventory().addMultiple([{
        idMaterial: "ticket",
        quantity: 1
    }]),
    new MaterialInventory().addMultiple([{
        idMaterial: "TierIV",
        quantity: 2
    },{
        idMaterial: "TierIII",
                quantity: 5
    }

    ])
);

export const lotsOfTickets = new MaterialInventory().addMultiple([{
        idMaterial: "ticket",
        quantity: 99999
    }])

export const tierIVRecipeColl = new MaterialRecipeCollection([tierIVRecipe, tierIVWithIIIRecipe])