import FramedDiv from "../../../component/Layout/FramedDiv";
import {MaterialLogsInput} from "@/app/history/[materialId]/materialLogsInput";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {MaterialHistoryCalculator} from "@/utils/entities/Material/MaterialHistoryCalculator";

export default function MaterialLogsManager({material}: { material: MaterialHistoryCalculator }) {
    const currentCount = material.getCurrentCount();

    return <FramedDiv sides={true} style={{width: "75%"}}>
        <SectionTitle title={material.material.toString(currentCount > 1, true) + " logs"}/>

        <div className={"flex flex-row"} style={{justifyContent: "space-between"}}>
            <p className={"text-base"}>
                You have currently have {currentCount} {material.name}
            </p>
            <MaterialLogsInput defaultQuantity={currentCount} materialId={material.id}/>
        </div>
    </FramedDiv>;
}

