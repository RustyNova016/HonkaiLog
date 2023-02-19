export type MaterialRarityType = "0" | "5" | "4";

export function isMaterialRarityType(str: string): str is MaterialRarityType {
    return str === "0" || str === "5" ||
        str === "4"
}