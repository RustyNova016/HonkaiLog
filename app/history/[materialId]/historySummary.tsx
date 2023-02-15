"use client"
import FramedDiv from "../../../component/Layout/FramedDiv";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {MaterialHistory, MaterialHistoryJSON} from "@/utils/entities/Material/MaterialHistory";
import {Suspense, useState} from "react";
import {TimeframeSelection} from "@/app/history/[materialId]/timeframeSelection";
import {HistorySummaryNet} from "@/app/history/[materialId]/historySummaryNet";
import {HistorySummaryAverages} from "@/app/history/[materialId]/historySummaryAverages";
import dayjs from "dayjs";
import {Col, Row} from "@/lib/Bootstrap/Layout";
import {MaterialSummaryGraph} from "@/app/history/[materialId]/materialSummaryGraph";
import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";
import {LoadingIconWithText} from "@/components/UI/Loading/LoadingIcon";

function HistorySummaryBody({calculator}: { calculator: MaterialHistoryCalculator }) {

    console.info("Setting logs from ", calculator.filter.period.start.toString(), "to today");
    return <>
        {calculator.haveLogsInFilter() ?
            <>
                <Row>
                    <Suspense fallback={<LoadingIconWithText subtext={"Crunching data"}/>}>
                        <Col>
                            <HistorySummaryNet calculator={calculator}/>
                        </Col>
                        <Col>
                            <HistorySummaryAverages calculator={calculator}/>
                        </Col>
                    </Suspense>
                </Row>
                <MaterialSummaryGraph historyCalculator={calculator}/>
            </>
            :
            <>Create a new log or change the time period to get your data </>
        }
    </>;
}

function HistorySummaryTimeFiltered({calculator}: { calculator: MaterialHistoryCalculator }) {
    const [nbrDaysBack, setNbrDaysBack] = useState(1);

    calculator.filter.period.start = nbrDaysBack === 99999 ? dayjs(0) : dayjs().add(-nbrDaysBack, "day")

    return <>
        <div className={"flex flex-row justify-content-between align-content-center"}>
            <SectionTitle title={"Summary"}/>

            <TimeframeSelection nbrDaysBack={nbrDaysBack} setNbrDaysBack={setNbrDaysBack}/>
        </div>

        <Suspense fallback={<LoadingIconWithText subtext={"Crunching data"}/>}>
            <HistorySummaryBody calculator={calculator}/>
        </Suspense>
    </>;
}

export function HistorySummary({materialJson}: { materialJson: MaterialHistoryJSON }) {
    const [calculator, setCalculator] = useState(new MaterialHistoryCalculator(
        MaterialHistory.fromJSON(materialJson),
        {
            period: {
                start: dayjs(),
                end: dayjs()
            }
        }
    ));


    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <HistorySummaryTimeFiltered calculator={calculator}/>
        </FramedDiv>
    </>;
}