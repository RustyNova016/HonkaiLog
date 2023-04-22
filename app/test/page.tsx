import {PerfTest} from "@/app/test/PerfTest";
import {testRecipeChainCalculator} from "@/app/test/testRecipeChainCalculator";
import {TierIVLightningStone12} from "../../tests/material/Test_Material_Inventory";

export default async function () {
    testRecipeChainCalculator(TierIVLightningStone12)

    //return <>lol</>
    return <><PerfTest/></>;
    //return <PerfTest mat={materialInfo}/>;
}

