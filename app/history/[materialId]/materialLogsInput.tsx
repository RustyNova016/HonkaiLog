"use client"
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {saveMaterialQuantityLog} from "@/app/history/[materialId]/saveMaterialQuantityLog";

export interface MaterialQuantityInputFormI {
    quantity: string
}

export function MaterialLogsInput(props: { defaultQuantity: number, materialId: string }) {
    const {register, handleSubmit} = useForm<MaterialQuantityInputFormI>();
    const router = useRouter();

    async function OnSubmit(data: MaterialQuantityInputFormI) {
        await saveMaterialQuantityLog({
            quantity: parseInt(data.quantity),
            idMaterial: props.materialId
        }).then(() => {router.refresh()})
    }

    return <>
        <form onSubmit={handleSubmit(OnSubmit)}>
            <label htmlFor="MaterialQuantityInput">Material Quantity</label>
            <div className="input-group mb-3">
                <input defaultValue={props.defaultQuantity} type={"number"}
                       className="form-control" {...register("quantity")} />
                <button className="btn btn-primary" type="submit" id="button-addon2">Save</button>
            </div>
        </form>
    </>
}