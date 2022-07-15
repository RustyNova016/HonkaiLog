export type HookType<dataType extends any> = (a: dataType) => void;

/** Handle a series of hooks */
export class HookHandler<dataType extends any> {
    private hooks: (HookType<dataType>)[] = []

    setHookValue(a: dataType) {
        for (const hook of this.hooks) {
            hook(a);
        }
    }

    addHook(a: HookType<dataType>){
        this.hooks.push(a)
    }
}