"use client"
import FramedDiv from "../../../component/Layout/FramedDiv";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {UserMaterialData} from "@/lib/Zod/Validations/UserMaterial";
import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import {useState} from "react";
import {TimeframeSelection} from "@/app/history/[materialId]/timeframeSelection";
import {HistorySummaryNet} from "@/app/history/[materialId]/historySummaryNet";
import {HistorySummaryAverages} from "@/app/history/[materialId]/historySummaryAverages";
import dayjs from "dayjs";

export function HistorySummary({materialJson, idUser}: { materialJson: UserMaterialData, idUser: string }) {
    const material = MaterialWithUserData.parse(materialJson, idUser)
    const [nbrDaysBack, setNbrDaysBack] = useState(1);

    const date = dayjs().add(-nbrDaysBack, "day")
    const logs = material.getLogs().removeLogsOlderThan(date, true)

    return <>
        <FramedDiv sides={true} style={{width: "75%"}}>
            <div className={"flex flex-row justify-content-between align-content-center"}>
                <SectionTitle title={"Summary"}/>

                <TimeframeSelection nbrDaysBack={nbrDaysBack} setNbrDaysBack={setNbrDaysBack}/>
            </div>

            <div className={"flex flex-row justify-content-evenly"}>
                <HistorySummaryNet material={material} logs={logs} />
                <HistorySummaryAverages material={material} logs={logs} period={{start: dayjs(), end: date}}/>
            </div>
        </FramedDiv>
    </>;
}