import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import FramedDiv from "../../../component/Layout/FramedDiv";
import {SectionTitle} from "../../../component/pageComponents/Theme/Theme";
import {MaterialQuantityInput} from "@/app/history/[materialId]/materialQuantityInput";
import {useRouter} from "next/router";

export function MaterialGeneralSection(props: { material: MaterialWithUserData }) {
    return <FramedDiv sides={true} style={{width: "75%"}}>
        <SectionTitle title={props.material.name + " logs"}/>

        <div className={"flex flex-row"}>
            <p className={"text-base"}>
                You have currently have {props.material.logCollection.getCurrentCount()} {props.material.name}
            </p>
            <MaterialQuantityInput defaultQuantity={props.material.logCollection.getCurrentCount()} materialId={props.material.id}/>
        </div>
    </FramedDiv>;
}

