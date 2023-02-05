import {z} from "zod";
import {MaterialQuantityCreateReq} from "@/lib/Zod/Validations/MaterialQuantityLog";
import axios from "axios";
import {APIRoutes} from "../../../data/API routes";

export async function saveMaterialQuantityLog(data: z.infer<typeof MaterialQuantityCreateReq>) {
    return await axios.post(APIRoutes.materialLogs, MaterialQuantityCreateReq.parse(data));
}