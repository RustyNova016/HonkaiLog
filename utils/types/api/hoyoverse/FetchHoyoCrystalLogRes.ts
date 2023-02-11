import {TimeItem} from "@/utils/types/api/hoyoverse/TimeItem";
import {ActionItems} from "@/utils/types/api/hoyoverse/ActionItems";
import {CrystalChanged} from "@/utils/types/api/hoyoverse/CrystalChanged";
import {CurrentCrystals} from "@/utils/types/api/hoyoverse/CurrentCrystals";

export interface HoyoCrystalLog {
    "item": [
        TimeItem,
        ActionItems,
        CrystalChanged,
        CurrentCrystals
    ];
}

export interface HoyoCrystalLogItem {
    item: string
    label: string,
}

export interface HoyoCrystalLogData {
    currentPage: number,
    lastUpdateTime: string;
    list: HoyoCrystalLog[]
    pageSize: number,
    userLastUpdateTime: string;
}

export interface FetchHoyoCrystalLogRes {
    data: HoyoCrystalLogData
    message: string
    retcode: number;
}