import {HoyoCrystalLogItem} from "@/utils/types/api/hoyoverse/FetchHoyoCrystalLogRes";

export interface CurrentCrystals extends HoyoCrystalLogItem {
    label: "Current Crystals";
    value: string;
}