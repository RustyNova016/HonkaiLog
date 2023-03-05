import {Material} from "@/utils/entities/Material/Material";
import {MaterialRecipeJSON} from "@/utils/types/materials/MaterialInfo";
import {EtherFuel} from "./Test_Materials";

export const tierIVElecMat = new Material("PurePurpleCrystalyte", "PurePurpleCrystalyte");


export const TierIVElecMatRecipes: MaterialRecipeJSON[] = [
    {
        require: [
            {id: "InviteOfMirage", quantity: 1}
        ],
        produce: [
            {id: tierIVElecMat.id, quantity: 2},
            {id: EtherFuel.id, quantity: 7}
        ],
        name: "Mirage Flour 7"
    },
    {
        require: [
            {id: "InviteOfMirage", quantity: 1},
            {id: "Time Swirl", quantity: 100}
        ],
        produce: [
            {id: tierIVElecMat.id, quantity: 8},
            {id: EtherFuel.id, quantity: 49}
        ],
        name: "Mirage Flour 7 With Hoard"
    },
    {
        require: [
            {id: EtherFuel.id, quantity: 10},
        ],
        produce: [
            {id: tierIVElecMat.id, quantity: 1},
        ],
        name: "Buying with Etherfuel"
    }
]

export const TimeSwirlRecipes: MaterialRecipeJSON[] = [
    {
        require: [
            {id: "Time Structure", quantity: 6}
        ],
        produce: [
            {id: "Time Swirl", quantity: 10}
        ]
    }
]



