import {Material} from "../../Models/Material";

// Type definitions

export interface MaterialReducerActions {
    type: "reload"
}

export interface MaterialReducerState {
    material: Material
}

// Data definitions

export const MaterialReducerInitialState: MaterialReducerState = {
    material: new Material(-1, "");
}

export async function MaterialReducer(state: MaterialReducerState, action: MaterialReducerActions): MaterialReducerState {
    switch (action.type) {
        case "reload":
            return {
                material: await state.material.createNewInstance()
            }

        default:
            return state
    }
}