import {Material} from "@/utils/entities/Material/Material";
import {MaterialInventory} from "@/utils/entities/Material/Recipes/MaterialInventory";
import {MaterialRecipe} from "@/utils/ORMEntities/Recipes/MaterialRecipe";
import {MaterialRecipeDictionary} from "@/utils/entities/Material/Recipes/MaterialRecipeDictionary";
import {MaterialRecipeJSON} from "@/utils/types/materials/MaterialInfo";
import {tierIVElecMat} from "../tests/material/Test_Recipes";

const ticket = new Material("InviteOfMirage", "Ticket");
const pass = new Material("pass", "Pass");
const EtherFuel = new Material("EtherFuel", "etherfuel");


export const tierIVF7Mirage: MaterialRecipeJSON = {
    require: [
        {idMaterial: ticket.id, quantity: 1}
    ],
    produce: [
        {idMaterial: tierIVElecMat.id, quantity: 2},
        {idMaterial: EtherFuel.id, quantity: 7}
    ],
    name: "Mirage Flour 7"
};

export const tierIVF7MirageHoard = {
    require: [
        {idMaterial: ticket.id, quantity: 1},
        {idMaterial: pass.id, quantity: 100}
    ],
    produce: [
        {idMaterial: tierIVElecMat.id, quantity: 8},
        {idMaterial: EtherFuel.id, quantity: 49}
    ],
    name: "Mirage Flour 7 With Hoard"
};

export const tierIVEtherFuel = {
    require: [
        {idMaterial: EtherFuel.id, quantity: 10},
    ],
    produce: [
        {idMaterial: tierIVElecMat.id, quantity: 1},
    ],
    name: "Buying with Etherfuel"
};

export const PureCrysRecipes = MaterialRecipeDictionary.fromJSON([
    tierIVF7Mirage, tierIVF7MirageHoard, tierIVEtherFuel
]);

export const InvitesRecipes = MaterialRecipeDictionary.fromJSON([{
    produce: [{idMaterial: ticket.idMaterial, quantity: 1}],
    require: [{idMaterial: "Time", quantity: 1}],
    name: "Wait for daily Mirage Invite"
}]);


export const tierIVRecipe = new MaterialRecipe(new MaterialInventory().addMultiple([{
    idMaterial: "ticket",
    quantity: 1
}]), new MaterialInventory().addMultiple([{
    idMaterial: "TierIV",
    quantity: 6
}]));

export const TwelveTierIV = new MaterialInventory().addMultiple([
    {
        idMaterial: "PurePurpleCrystalyte",
        quantity: 12
    },
    {
        idMaterial: ticket.id,
        quantity: 0
    }
]);

export const TwelveTierIVAnd50Fuel = new MaterialInventory().addMultiple([
    {
        idMaterial: "PurePurpleCrystalyte",
        quantity: 12
    },
    {
        idMaterial: "EtherFuel",
        quantity: 50
    }
]);

export const TierIVElec140 = new MaterialInventory().addMultiple([
    {
        idMaterial: "PurePurpleCrystalyte",
        quantity: 140
    }
]);

export const tierIVWithIIIRecipe = new MaterialRecipe(new MaterialInventory().addMultiple([{
    idMaterial: "ticket",
    quantity: 1
}]), new MaterialInventory().addMultiple([{
    idMaterial: "TierIV",
    quantity: 2
}, {
    idMaterial: "TierIII",
    quantity: 5
}

]));

export const currentStock = new MaterialInventory().addMultiple(
    [
        {idMaterial: ticket.id, quantity: 5},
        {idMaterial: pass.id, quantity: 3022}
    ]
);
//new MaterialRecipeDictionary([tierIVRecipe, tierIVWithIIIRecipe]);
