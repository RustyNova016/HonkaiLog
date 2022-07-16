import {createContext, PropsWithChildren, useState} from "react";
import {ReturnChildren} from "../component/returnChildren";

export interface ITimeframeState {
    end: Date
    start: Date
}

export interface ITimeframeContext {
    setEndDate: (date: Date) => void
    setStartDate: (date: Date) => void
    timeframe: ITimeframeState
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
    const [startDate, setStartDate] = useState<Date>(new Date());
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