import {createContext} from "react";
import {Material} from "../../tools/Models/Material";

export const MaterialContext = createContext<Material>(new Material(-1, ""));