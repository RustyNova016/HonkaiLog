import {HoyoCrystalLogItem} from "@/utils/types/api/hoyoverse/FetchHoyoCrystalLogRes";

export interface TimeItem extends HoyoCrystalLogItem {
    label: "Time",
    value: string
}