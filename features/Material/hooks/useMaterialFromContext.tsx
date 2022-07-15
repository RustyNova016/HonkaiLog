import {useContext} from "react";
import {MaterialIDContext} from "../contexts/MaterialIDContext";
import {useMaterial} from "./useMaterial";

/** Get the material depending on the context */
export function useMaterialFromContext(logs?: boolean) {
    const id = useContext(MaterialIDContext);

    if (id === -1) {
        throw new Error(`Error: MaterialIDContext has an invalid value of ${id}. Did you set the context correctly?`)
    }

    return useMaterial(id, logs);
}