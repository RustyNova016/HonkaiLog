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


export function HistorySummary({materialJson, idUser}: { materialJson: UserMaterialData, idUser: string }) {
    const material = MaterialWithUserData.parse(materialJson, idUser)
    const [nbrDaysBack, setNbrDaysBack] = useState(1);

    let date: Dayjs;
    if (nbrDaysBack === 99999) {
        date = dayjs(0)
    } else {
        date = dayjs().add(-nbrDaysBack, "day")
    }

    console.log("Setting logs from ", date.toString())
    const logs = material.getLogs().removeLogsOlderThan(date, true)

    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <div className={"flex flex-row justify-content-between align-content-center"}>
                <SectionTitle title={"Summary"}/>

                <TimeframeSelection nbrDaysBack={nbrDaysBack} setNbrDaysBack={setNbrDaysBack}/>
            </div>
            <span></span>

            <Row>
                <Col>
                    <HistorySummaryNet material={material} logs={logs}/>
                </Col>
                <Col>
                    <HistorySummaryAverages material={material} logs={logs} period={{start: dayjs(), end: date}}/>
                </Col>
            </Row>
        </FramedDiv>
    </>;
}