"use client";
import {HistorySummaryAverages} from "@/app/history/[materialId]/historySummaryAverages";
import {HistorySummaryNet} from "@/app/history/[materialId]/historySummaryNet";
import {MaterialSummaryGraph} from "@/app/history/[materialId]/materialSummaryGraph";
import {TimeframeSelection} from "@/app/history/[materialId]/timeframeSelection";
import {LoadingIconWithText} from "@/components/UI/Loading/LoadingIcon";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {Col, Row} from "@/lib/Bootstrap/Layout";
import {MaterialBuilder, MaterialInfo} from "@/utils/entities/Material/MaterialBuilder";
import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";
import dayjs from "dayjs";
import {Suspense, useState} from "react";
import FramedDiv from "../../../component/Layout/FramedDiv";

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

    calculator.filter.period.start = nbrDaysBack === 99999 ? dayjs(0) : dayjs().add(-nbrDaysBack, "day");
    calculator.filter.period.end = dayjs();

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

export function HistorySummary({materialInfo}: { materialInfo: MaterialInfo }) {
    const [calculator] = useState(MaterialBuilder.convertToEntities(materialInfo).history.getCalculator());

    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <HistorySummaryTimeFiltered calculator={calculator}/>
        </FramedDiv>
    </>;
}