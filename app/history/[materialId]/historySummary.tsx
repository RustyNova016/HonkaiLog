"use client"
import FramedDiv from "../../../component/Layout/FramedDiv";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {UserMaterialData} from "@/lib/Zod/Validations/UserMaterial";
import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import {useState} from "react";
import {TimeframeSelection} from "@/app/history/[materialId]/timeframeSelection";
import {HistorySummaryNet} from "@/app/history/[materialId]/historySummaryNet";
import {HistorySummaryAverages} from "@/app/history/[materialId]/historySummaryAverages";
import dayjs, {Dayjs} from "dayjs";
import {Col, Row} from "@/lib/Bootstrap/Layout";
import {MaterialSummaryGraph} from "@/app/history/[materialId]/materialSummaryGraph";

export function HistorySummary({materialJson, idUser}: { materialJson: UserMaterialData, idUser: string }) {
    const material = MaterialWithUserData.parse(materialJson, idUser)
    const [nbrDaysBack, setNbrDaysBack] = useState(1);
    let periodStart: Dayjs;

    if (nbrDaysBack === 99999) {
        periodStart = dayjs(0)
    } else {
        periodStart = dayjs().add(-nbrDaysBack, "day")
    }

    console.info("Setting logs from ", periodStart.toString(), "to today");
    const logs = material.getLogs().removeLogsOlderThan(periodStart, true);
    console.info("New log collection: ", logs);

    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <div className={"flex flex-row justify-content-between align-content-center"}>
                <SectionTitle title={"Summary"}/>

                <TimeframeSelection nbrDaysBack={nbrDaysBack} setNbrDaysBack={setNbrDaysBack}/>
            </div>

            {logs.getLogAfterDate(periodStart) !== undefined ?
                <>
                    <Row>
                        <Col>
                            <HistorySummaryNet material={material} logs={logs}/>
                        </Col>
                        <Col>
                            <HistorySummaryAverages material={material} logs={logs}
                                                    period={{start: periodStart, end: dayjs()}}/>
                        </Col>
                    </Row>
                    <MaterialSummaryGraph logs={logs} startDate={periodStart}/>
                </>
                :
                <>Create a new log or change the time period to get your data </>
            }

        </FramedDiv>
    </>;
}