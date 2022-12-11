import {MaterialWithUserData} from "@/utils/Objects/MaterialWithUserData";
import FramedDiv from "../../../component/Layout/FramedDiv";
import {SectionTitle} from "../../../component/pageComponents/Theme/Theme";
import {HistorySumary} from "@/app/history/[materialId]/historySumary";

export default function MaterialHistory({material}: { material: MaterialWithUserData }) {


    return <FramedDiv sides={true} style={{width: "75%"}}>
        <SectionTitle title={"Summary"}/>

        <h4>Summary of this period:</h4>


        <HistorySumary material={material}/>

    </FramedDiv>
}