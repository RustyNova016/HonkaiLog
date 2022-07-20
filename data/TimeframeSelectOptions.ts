export interface TimeframeSelectOption {
    name: string
    nbDays: number
}

export const timeframeSelectOptions: TimeframeSelectOption[] = [
    {
        name: "1 day",
        nbDays: 1
    },
    {
        name: "7 days",
        nbDays: 7
    },
    {
        name: "30 days",
        nbDays: 30
    },
    {
        name: "90 days",
        nbDays: 90
    },
    {
        name: "365 days",
        nbDays: 365
    }
]