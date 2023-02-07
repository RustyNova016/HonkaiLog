import {z} from "zod";
import axios from "axios";
import {APIRoutes} from "../../../data/API routes";
import {MaterialQuantityCreateReq} from "@/utils/Objects/Material/validations/MaterialQuantityLog.JSONZod";

export async function saveMaterialQuantityLog(data: z.infer<typeof MaterialQuantityCreateReq>) {
    return await axios.post(APIRoutes.materialLogs, MaterialQuantityCreateReq.parse(data));
}