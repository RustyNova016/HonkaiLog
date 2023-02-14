import {Block} from "@/utils/classes/Block";
import {BlockPlacement} from "@/utils/enums/BlockPlacement";

export type BlockCouple<BlockType extends Block<any>> = {
    prevBlock: BlockType | undefined,
    nextBlock: BlockType | undefined
}

export class Chain<BlockType extends Block<any>> {
    protected chain: Map<string, BlockType> = new Map<string, BlockType>();

    public findPlacement(block: BlockType): BlockCouple<BlockType> {
        let previousBlock: BlockType | undefined = undefined
        let currentBlock: BlockType | undefined = this.getFirstBlock();

        while (currentBlock !== undefined) {
            const blockPlacement = block.isPlaced(currentBlock);
            if (blockPlacement === BlockPlacement.before) {
                return {prevBlock: previousBlock, nextBlock: currentBlock}
            }

            previousBlock = currentBlock
            currentBlock = currentBlock.nextBlock;
        }

        return {prevBlock: previousBlock, nextBlock: undefined}
    }

    public get(idBlock: string): BlockType | undefined {
        return this.chain.get(idBlock)
    }

    public getFirstBlock(): BlockType | undefined {
        let [blockIte] = this.chain.values()

        while (blockIte !== undefined) {
            if (blockIte.idPreviousBlock === undefined) {return blockIte}
            blockIte = blockIte.previousBlock
        }

        return;
    }

    public getLastBlock(): BlockType | undefined {
        let [blockIte] = this.chain.values()

        while (blockIte !== undefined) {
            if (blockIte.idNextBlock === undefined) {return blockIte}
            blockIte = blockIte.nextBlock
        }

        return;
    }

    protected insertBlock(newBlock: BlockType | null | undefined) {
        if (newBlock === undefined || newBlock === null){return}

        const placement = this.findPlacement(newBlock);
        newBlock.link(placement.prevBlock, placement.nextBlock, this)
        this.chain.set(newBlock.id, newBlock)
    }

    protected removeBlock(block: BlockType) {
        block.unLink();
        this.chain.delete(block.id)
    }

    /** Return the array sorted from the first to the last block */
    public toArray(): BlockType[] {
        const result: BlockType[] = []
        let currentBlock = this.getFirstBlock();
        if (currentBlock === undefined) {return result}

        while (currentBlock !== undefined) {
            //console.log("Test: ", currentLog)
            result.push(currentBlock.copy())
            currentBlock = currentBlock.nextBlock
        }

        return result
    }
}