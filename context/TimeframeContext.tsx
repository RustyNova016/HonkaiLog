import {createContext, PropsWithChildren, useState} from "react";
import {ReturnChildren} from "../component/returnChildren";
import {removeDaysFromToday} from "../tools/Miscs";

export interface Timeframe {
    end: Date
    start: Date
}

export interface ITimeframeContext {
    setEndDate: (date: Date) => void
    setStartDate: (date: Date) => void
    timeframe: Timeframe
}

export const TimeframeContext = createContext<ITimeframeContext>({
    setEndDate: () => {},
    setStartDate: () => {},
    timeframe: {
        end: new Date(),
        start: new Date()
    }
});

export function TimeframeContextProvider(props: PropsWithChildren) {
    const [startDate, setStartDate] = useState<Date>(removeDaysFromToday(1));
    const [endDate, setEndDate] = useState<Date>(new Date());

    const value: ITimeframeContext = {
        timeframe: {
            end: endDate,
            start: startDate
        },
        setEndDate,
        setStartDate
    };

    return <>
        <TimeframeContext.Provider value={value}>
            <ReturnChildren {...props}/>
        </TimeframeContext.Provider>
    </>
}