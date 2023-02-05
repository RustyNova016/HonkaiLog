import _ from "lodash";

export class BattlePassCalculator {
    public xp: number;
    public maxXP: number;
    public daysRemaining: number;
    public weeksLimit: number;

    constructor(xp: number, maxXP: number, daysRemaining: number, weekLimit: number) {
        this.xp = xp;
        this.maxXP = maxXP;
        this.daysRemaining = daysRemaining;
        this.weeksLimit = weekLimit;
    }

    public getRemainingXP(): number {
        return this.maxXP - this.xp;
    }

    public getNbWeeksLeft(): number {
        return _.ceil(this.daysRemaining / 7, 0)
    }
    public getNbWholeWeeksLeft(): number {
        return _.floor(this.daysRemaining / 7, 0)
    }

    public getXpPerDay(): number {
        return _.ceil(this.getRemainingXP() / this.daysRemaining, 0)
    }

    public getXpPerWeek(): number {
        return _.ceil(this.getRemainingXP() / this.getNbWeeksLeft(), 0)
    }

    public getMaxXPObtainable(): number {
        return (12000 * this.getNbWholeWeeksLeft()) + (10000 - this.weeksLimit)
    }


}