import {MaterialLogsInput} from "@/app/history/[materialId]/materialLogsInput";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {Material} from "@/utils/entities/Material/Material";
import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";
import FramedDiv from "../../../component/Layout/FramedDiv";

function AuthKeyInput() {
    return <>
        <form></form>
    </>;
}

export default function MaterialLogsManager({historyCalculator}: { historyCalculator: MaterialHistoryCalculator }) {
    const currentCount = historyCalculator.getCurrentCount();

    const material: Material = historyCalculator.materialHistory.material;
    return <FramedDiv sides={true} style={{width: "75%"}}>
        <SectionTitle title={material.toString(currentCount > 1, true) + " logs"}/>

        <div className={"flex flex-row"} style={{justifyContent: "space-between"}}>
            <p className={"text-base"}>
                You have currently have {currentCount} {material.name}
            </p>
            <MaterialLogsInput defaultQuantity={currentCount} materialId={historyCalculator.id}/>
            <AuthKeyInput/>
        </div>
    </FramedDiv>;
}

