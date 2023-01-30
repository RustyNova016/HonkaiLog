"use client"
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {Form} from "react-bootstrap";
import {useState} from "react";
import _ from "lodash";

export function BattlepassSummary() {
    const [BPXP, setBPXP] = useState(0);
    const [BPLV, setBPLV] = useState(0);
    const [maxBPLV, setmaxBPLV] = useState(70);

    const bpCalc = new BattlePassCalculator(
        BPXP + (BPLV*1000),
        maxBPLV * 1000,
        20 // TODO: Add input
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
                <Form.Label className="mb-3">Max level:</Form.Label>
                <Form.Control type="number" placeholder="Max Level" value={maxBPLV} onChange={event => {
                    //parse target value to int
                    let parsed = parseInt(event.target.value);
                    if (parsed < 0) {parsed = 0}
                    if (parsed > 100) {parsed = 100}
                    setmaxBPLV(parsed)
                }}/>
            </Form.Group>
        </Form>

        <p>
            - You need {bpCalc.getRemainingXP()}xp to finish the BP. Which is {bpCalc.getXpPerDay()} per day, and {bpCalc.getXpPerWeek()} per week
        </p>
    </>
}

export class BattlePassCalculator {
    public xp: number;
    public maxXP: number;
    public daysRemaining: number;


    constructor(xp: number, maxXP: number, daysRemaining: number) {
        this.xp = xp;
        this.maxXP = maxXP;
        this.daysRemaining = daysRemaining;
    }

    public getRemainingXP(): number {
        return this.maxXP - this.xp;
    }

    public getNbWeeksLeft(): number {
        return _.ceil(this.daysRemaining/7, 0)
    }

    public getXpPerDay(): number {
        return _.ceil(this.getRemainingXP()/this.daysRemaining, 0)
    }

    public getXpPerWeek(): number {
        return _.ceil(this.getRemainingXP()/this.getNbWeeksLeft(), 0)
    }
}