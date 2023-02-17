"use client"
import FramedDiv from "../../../component/Layout/FramedDiv";
import {useForm} from "react-hook-form";
import axios from "axios";
import {APIRoutes} from "../../../data/API routes";
import {useState} from "react";
import {HoyoverseAPI} from "@/lib/External APIs/Hoyoverse/HoyoverseAPI";
import {HoyoAPITypes} from "@/lib/External APIs/Hoyoverse/ApiTypes";
import {MaterialHistoryConverters} from "@/lib/External APIs/Hoyoverse/MaterialHistoryConverters";
import {LoadingIconWithText} from "@/components/UI/Loading/LoadingIcon";

export interface AuthkeyForm {
    authkeyUrl: string
}

export function ImportAuthkeyInput() {
    const {register, handleSubmit} = useForm<AuthkeyForm>();
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function OnSubmit(data: AuthkeyForm) {
        setLoading(true)
        setErrorMessage("")
        const authkey = new URLSearchParams(data.authkeyUrl).get('authkey');
        if (authkey === null) {setErrorMessage("Cannot get authkey"); setLoading(false); return}

        const ApiResponses = HoyoverseAPI.fetchAPIs(HoyoAPITypes, authkey, setLoadingMessage);
        const materialHistories = MaterialHistoryConverters.APIResArray_To_MaterialHistoryExports(await ApiResponses)

        const inserted = await axios.post(APIRoutes.saveHistories, {histories: materialHistories});
        console.log(inserted)
        setLoading(false)
    }

    return <FramedDiv sides={true} style={{width: "75%"}}>
        <form onSubmit={handleSubmit(OnSubmit)}>
            <label htmlFor="MaterialQuantityInput">Insert Authkey</label>
            <div className="input-group mb-3">
                <input className="form-control" {...register("authkeyUrl")} />
                <button className="btn btn-primary" type="submit" id="button-addon2">Fetch History</button>
            </div>
        </form>
        {errorMessage !== ""? errorMessage:null}
        {loading? <LoadingIconWithText subtext={loadingMessage}></LoadingIconWithText>:null}
    </FramedDiv>;
}