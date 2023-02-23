"use client";
import {BoxLoadingIcon} from "@/components/UI/Loading/Box/BoxLoadinIcon";
import {HoyoAPITypes} from "@/lib/External APIs/Hoyoverse/ApiTypes";
import {HoyoverseAPI} from "@/lib/External APIs/Hoyoverse/HoyoverseAPI";
import {MaterialHistoryConverters} from "@/utils/entities/Material/history/MaterialHistoryConverters";
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {CenteredDiv} from "../../../component/Layout/CenteredDiv";
import FramedDiv from "../../../component/Layout/FramedDiv";
import {APIRoutes} from "../../../data/API routes";


export interface AuthkeyForm {
    authkeyUrl: string;
}

export function ImportAuthkeyInput(props: { idUser: string }) {
    const {register, handleSubmit} = useForm<AuthkeyForm>();
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function OnSubmit(data: AuthkeyForm) {
        setLoading(true);
        setErrorMessage("");

        const authkey = new URLSearchParams(data.authkeyUrl).get("authkey");
        if (authkey === null) {
            setErrorMessage("Cannot get authkey");
            setLoading(false);
            return;
        }

        const ApiResponses = HoyoverseAPI.fetchAPIs(HoyoAPITypes, authkey, setLoadingMessage);
        const materialHistories = MaterialHistoryConverters.APIResArray_To_MaterialHistoryExports(await ApiResponses, props.idUser);

        setLoadingMessage("Saving Logs");
        const inserted = await axios.post(APIRoutes.saveHistories, {histories: materialHistories});
        console.log(inserted);
        setLoading(false);
    }

    return <FramedDiv sides={true} style={{width: "75%"}}>
        <form onSubmit={handleSubmit(OnSubmit)}>
            <label htmlFor="MaterialQuantityInput">Insert Authkey</label>
            <div className="input-group mb-3">
                <input className="form-control" {...register("authkeyUrl")} />
                <button className="btn btn-primary" type="submit" id="button-addon2">Fetch History</button>
            </div>
        </form>
        {errorMessage !== "" ? errorMessage : null}
        {loading ?
            <CenteredDiv style={{display: "flex", flexDirection: "column"}}>
                <div style={{fontSize: "10em"}}>
                    <BoxLoadingIcon height={300} width={300}/>
                </div>

                <p style={{textAlign: "center", color: "white", fontSize: "1em"}}>{loadingMessage}</p>
            </CenteredDiv>
            : null}
    </FramedDiv>;
}