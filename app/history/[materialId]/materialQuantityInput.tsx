"use client"
import {useForm} from "react-hook-form";
import {saveMaterialQuantityLog} from "@/utils/Objects/MaterialQuantityLog";
import {useRouter} from "next/navigation";

export interface MaterialQuantityInputFormI {
    quantity: string
}

export function MaterialQuantityInput(props: { defaultQuantity: number, materialId: number }) {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<MaterialQuantityInputFormI>();
    const router = useRouter();

    async function OnSubmit(data: MaterialQuantityInputFormI) {
        await saveMaterialQuantityLog({quantity: parseInt(data.quantity), idMaterial: props.materialId}).then(value => {router.refresh()})
    }

    return <>
        <form onSubmit={handleSubmit(OnSubmit)}>
            <label htmlFor="MaterialQuantityInput">Material Quantity</label>
            <div className="input-group mb-3">
                <input defaultValue={props.defaultQuantity} type={"number"} className="form-control" {...register("quantity")} />
                <button className="btn btn-primary" type="submit" id="button-addon2">Save</button>
            </div>
        </form>
    </>
}