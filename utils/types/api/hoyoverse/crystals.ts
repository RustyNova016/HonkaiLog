export interface HoyoCrystalLog {
    "item": [
        {
            label: "Time",
            value: string
        },
        {
            label: "Action(s)",
            value: string
        },
        {
            label: "Crystals Changed",
            value: string
        },
        {
            label: "Current Crystals",
            value: string
        }
    ];
}

export interface HoyoCrystalLogData {
    userLastUpdateTime: string;
    lastUpdateTime: string;
    currentPage: number,
    pageSize: number,
    list: HoyoCrystalLog[]
}

export interface FetchHoyoCrystalLogRes {
    retcode: number;
    message: string
    data: HoyoCrystalLogData
}