import {Chain} from "@/utils/classes/Chain";
import {BlockPlacement} from "@/utils/enums/BlockPlacement";

export abstract class Block<ChainBlockType extends Block<any>> {
    id: string
    protected _chain: Chain<ChainBlockType> | undefined
    protected _idNextBlock: string | undefined;
    protected _idPreviousBlock: string | undefined;

    constructor(id: string) {
        this.id = id;
    }

    get chain(): Chain<ChainBlockType> {
        if (this._chain === undefined) {throw new Error("The block isn't linked to a chain")}
        return this._chain;
    }

    get idNextBlock(): string | undefined {
        return this._idNextBlock;
    }

    get idPreviousBlock(): string | undefined {
        return this._idPreviousBlock;
    }

    get linked() {
        return this._idPreviousBlock !== undefined || this._idNextBlock !== undefined
    }

    get nextBlock(): ChainBlockType | undefined {
        if (this._idNextBlock === undefined) {return undefined}
        return this.chain.get(this._idNextBlock)
    }

    get previousBlock(): ChainBlockType | undefined {
        if (this._idPreviousBlock === undefined) {return undefined}
        return this.chain.get(this._idPreviousBlock)
    }

    public abstract isPlaced(baseBlock: Block<ChainBlockType>): BlockPlacement

    public link(prevBlock: ChainBlockType | undefined, nextBlock: ChainBlockType | undefined, chain: Chain<ChainBlockType>) {
        this._chain = chain
        this._idPreviousBlock = prevBlock?.id;
        if (prevBlock !== undefined) {prevBlock._idNextBlock = this.id}

        this._idNextBlock = nextBlock?.id;
        if (nextBlock !== undefined) {nextBlock._idPreviousBlock = this.id;}
    }

    public unLink() {
        let prevBlock;
        let nextBlock;

        if (this._idPreviousBlock !== undefined) {prevBlock = this.chain.get(this._idPreviousBlock)}
        if (this._idNextBlock !== undefined) {nextBlock = this.chain.get(this._idNextBlock)}

        if (prevBlock === undefined) {
            if (nextBlock === undefined) {return}
            nextBlock._idPreviousBlock = undefined;
            return;
        }

        if (nextBlock === undefined) {
            prevBlock._idNextBlock = undefined
            return;
        }

        prevBlock._idNextBlock = nextBlock.id;
        nextBlock._idPreviousBlock = prevBlock.id
        this._chain = undefined
    }

    public abstract copy(): ChainBlockType
}

export interface BlockJSON {
    id: string;
}