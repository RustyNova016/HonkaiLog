"use client"
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {Form} from "react-bootstrap";
import {useState} from "react";
import {BattlePassCalculator} from "@/utils/entities/battlePassCalculator";

export function BattlepassSummary() {
    const [BPXP, setBPXP] = useState(0);
    const [BPLV, setBPLV] = useState(0);
    const [maxBPLV, setmaxBPLV] = useState(70);
    const [limitProgress, setLimitProgress] = useState(0);

    const bpCalc = new BattlePassCalculator(
        BPXP + (BPLV*1000),
        maxBPLV * 1000,
        20, // TODO: Add input
        limitProgress
    )

    return <>
        <div className={"flex flex-row justify-content-between align-content-center"}>
            <SectionTitle title={"Calculator"}/>
        </div>


        <Form className={"flex flex-row justify-content-around align-items-center text-center"}>
            <Form.Group className="mb-3 flex-row">
                <Form.Label className="mb-3">Current level:</Form.Label>
                <Form.Control type={"number"} placeholder="Current Level" value={BPLV} onChange={event => {
                    //parse target value to int
                    let parsed = parseInt(event.target.value);
                    if (parsed < 0) {parsed = 0}
                    if (parsed > maxBPLV) {parsed = maxBPLV}
                    setBPLV(parsed)
                }}/>
            </Form.Group>
            <Form.Group className="mb-3 flex-row">
                <Form.Label className="mb-3">Current XP:</Form.Label>
                <Form.Control type={"number"} placeholder="Current Level" value={BPXP} onChange={event => {
                    //parse target value to int
                    let parsed = parseInt(event.target.value);
                    if (parsed < 0) {parsed = 0}
                    if (parsed > 999) {parsed = 999}
                    setBPXP(parsed)
                }}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="mb-3">Current BP this week:</Form.Label>
                <Form.Control type="number" placeholder="Max Level" value={limitProgress} onChange={event => {
                    //parse target value to int
                    let parsed = parseInt(event.target.value);
                    if (parsed < 0) {parsed = 0}
                    if (parsed > 10000) {parsed = 100}
                    setLimitProgress(parsed)
                }}/>
            </Form.Group>
        </Form>

        <p>
            - You need {bpCalc.getRemainingXP()}xp to finish the BP. Which is {bpCalc.getXpPerDay()} per day, and {bpCalc.getXpPerWeek()} per week<br/>
            - You can get {bpCalc.getMaxXPObtainable()}
        </p>
    </>
}

export interface BattlepassType {
    name: string,
    bpPerWeek: string;
}