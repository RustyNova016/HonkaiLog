import {Chain} from "@/utils/Chain";
import {BlockPlacement} from "@/utils/enums/BlockPlacement";

export abstract class Block {
    chain: Chain
    id: string
    idNextBlock: string | undefined;
    idPreviousBlock: string | undefined;

    constructor(id: string, chain: Chain) {
        this.id = id;
        this.chain = chain;
    }

    get linked() {
        return this.idPreviousBlock !== undefined || this.idNextBlock !== undefined
    }

    get nextBlock(): Block | undefined {
        if (this.idNextBlock === undefined) {return undefined}
        return this.chain.get(this.idNextBlock)
    }

    get previousBlock(): Block | undefined {
        if (this.idPreviousBlock === undefined) {return undefined}
        return this.chain.get(this.idPreviousBlock)
    }

    public abstract isPlaced(baseBlock: Block): BlockPlacement

    public link(prevBlock: Block|undefined, nextBlock: Block|undefined) {
        this.idPreviousBlock = prevBlock?.id;
        if(prevBlock !== undefined){prevBlock.idNextBlock = this.id}

        this.idNextBlock = nextBlock?.id;
        if(nextBlock !== undefined){nextBlock.idPreviousBlock = this.id;}
    }

    public unLink() {
        let prevBlock;
        let nextBlock;

        if (this.idPreviousBlock !== undefined) {prevBlock = this.chain.get(this.idPreviousBlock)}
        if (this.idNextBlock !== undefined) {nextBlock = this.chain.get(this.idNextBlock)}

        if (prevBlock === undefined) {
            if (nextBlock === undefined) {return}
            nextBlock.idPreviousBlock = undefined;
            return;
        }

        if (nextBlock === undefined) {
            prevBlock.idNextBlock = undefined
            return;
        }

        prevBlock.idNextBlock = nextBlock.id;
        nextBlock.idPreviousBlock = prevBlock.id
    }
}