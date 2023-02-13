import {Block} from "@/utils/functions/Block";
import {BlockPlacement} from "@/utils/enums/BlockPlacement";

export type BlockCouple = {prevBlock: Block|undefined, nextBlock: Block|undefined}

export class Chain {
    private chain: Map<string, Block> = new Map<string, Block>();

    public insertBlock(newBlock: Block){
        const placement = this.findPlacement(newBlock);
        newBlock.link(placement.prevBlock, placement.prevBlock)
        this.chain.set(newBlock.id, newBlock)
    }

    removeBlock(block: Block){
        block.unLink();
        this.chain.delete(block.id)
    }

    public getFirstBlock(): Block | undefined {
        let [blockIte] = this.chain.values()

        while (blockIte !== undefined) {
            if(blockIte.idPreviousBlock === undefined) {return blockIte}
            blockIte = blockIte.previousBlock
        }

        return;
    }

    public findPlacement(block: Block): BlockCouple {
        let blockIte = this.getFirstBlock();
        if (blockIte === undefined) {return {nextBlock: undefined, prevBlock: undefined}};
        if (blockIte.isPlaced(blockIte) === BlockPlacement.before) {return {nextBlock: blockIte, prevBlock: undefined}}

        while (blockIte.nextBlock !== undefined) {
            const previousBlock = blockIte
            blockIte = blockIte.nextBlock;

            if(block.isPlaced(blockIte) === BlockPlacement.before) {continue}
            return {prevBlock: previousBlock, nextBlock: blockIte}
        }

        return {prevBlock: blockIte, nextBlock: undefined}
    }

    public get(idBlock: string) {
        return this.chain.get(idBlock)
    }
}