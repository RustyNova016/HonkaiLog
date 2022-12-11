import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import FramedDiv from "../../../component/Layout/FramedDiv";
import {SectionTitle} from "../../../component/pageComponents/Theme/Theme";
import {MaterialLogsInput} from "@/app/history/[materialId]/materialLogsInput";

export default function MaterialLogsManager({material}: { material: MaterialWithUserData }) {
    const currentCount = material.getLogs().getCurrentCount();

    return <FramedDiv sides={true} style={{width: "75%"}}>
        <SectionTitle title={material.getName(currentCount > 1, true) + " logs"}/>

        <div className={"flex flex-row"} style={{justifyContent: "space-between"}}>
            <p className={"text-base"}>
                You have currently have {currentCount} {material.name}
            </p>
            <MaterialLogsInput defaultQuantity={currentCount} materialId={material.id}/>
        </div>
    </FramedDiv>;
}

