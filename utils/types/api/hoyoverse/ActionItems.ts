import {HoyoCrystalLogItem} from "@/utils/types/api/hoyoverse/FetchHoyoCrystalLogRes";

export interface ActionItems extends HoyoCrystalLogItem {
    label: "Action(s)",
    value: string
}