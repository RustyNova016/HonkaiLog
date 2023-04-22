"use client";
import {testRecipeChainCalculator} from "@/app/test/testRecipeChainCalculator";
import {PropsWithChildren} from "react";
import {
    G4ELecStigma,
    TierIVLightningStone12,
    TierIVLightningStone200
} from "../../tests/material/Test_Material_Inventory";

export function PerfTest(props: PropsWithChildren) {
    const onClick12 = () => {
        testRecipeChainCalculator(TierIVLightningStone12);
    };

    const onClick = () => {
        testRecipeChainCalculator(TierIVLightningStone200);
    };

    const onClickStig = () => {
        testRecipeChainCalculator(G4ELecStigma);
    }

    return <div>
        {props.children}
        <button onClick={onClick12}>Test 12 Stones</button>
        <button onClick={onClick}>Test 200 Stones</button>
        <button onClick={onClickStig}>Test Stig</button>
    </div>;
}
