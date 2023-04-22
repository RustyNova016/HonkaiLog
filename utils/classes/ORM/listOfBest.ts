import {IdChecklist} from "@/utils/classes/ORM/IdChecklist";

import {ManyToMany} from "@/utils/classes/ORM/ManyToMany";

export class ListOfBest extends IdChecklist {
    private itemIsNotWorseThan = new ManyToMany();
    private itemIsWorseThan = new ManyToMany();

    constructor(isWorse: (idBase: string, idComparedAgainst: string) => boolean = () => false) {
        super();
        this.isWorse = isWorse;
    }

    get bests() {return this.trueValues;}

    public isWorse: (idBase: string, idComparedAgainst: string) => boolean = () => false;

    public override set(key: string, value: boolean): this {
        super.set(key, value);
        if (value) {this.updateList();}
        return this;
    }

    private handleIsWorseResult(idBase: string, idComparedAgainst: string, isWorseRes: boolean) {
        if (!isWorseRes) {
            this.itemIsNotWorseThan.linkIds(idBase, idComparedAgainst);
            return;
        }

        this.itemIsWorseThan.linkIds(idBase, idComparedAgainst)
        this.set(idBase, false)
    }

    private isWorseWithCache(idBase: string, idComparedAgainst: string) {
        if (this.itemIsWorseThan.isParentOf(idBase, idComparedAgainst)) { return true; }
        if (this.itemIsNotWorseThan.isParentOf(idBase, idComparedAgainst)) { return false; }

        const isWorseRes = this.isWorse(idBase, idComparedAgainst);
        this.handleIsWorseResult(idBase, idComparedAgainst, isWorseRes)
        return isWorseRes
    }

    private updateList() {
        const bests = this.bests;

        bests.forEach(currentBest => {
            bests.some(againstBest => this.isWorseWithCache(currentBest, againstBest))
        })
    }
}

