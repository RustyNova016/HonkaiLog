import {HoyoCrystalLogItem} from "@/utils/types/api/hoyoverse/FetchHoyoCrystalLogRes";

export interface CrystalChanged extends HoyoCrystalLogItem {
    label: "Crystals Changed";
    value: string;
}