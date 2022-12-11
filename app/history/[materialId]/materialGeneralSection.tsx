import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import FramedDiv from "../../../component/Layout/FramedDiv";
import {SectionTitle} from "../../../component/pageComponents/Theme/Theme";
import {MaterialQuantityInput} from "@/app/history/[materialId]/materialQuantityInput";

export default function MaterialGeneralSection({material}: { material: MaterialWithUserData }) {
    return <FramedDiv sides={true} style={{width: "75%"}}>
        <SectionTitle title={material.getName(false, true) + " logs"}/>

        <div className={"flex flex-row"} style={{justifyContent: "space-between"}}>
            <p className={"text-base"}>
                You have currently have {material.logCollection.getCurrentCount()} {material.name}
            </p>
            <MaterialQuantityInput defaultQuantity={material.logCollection.getCurrentCount()}
                                   materialId={material.id}/>
        </div>
    </FramedDiv>;
}

