import {z} from "zod";
import {MaterialQuantityLogJSONZod} from "@/utils/Objects/Material/validations/MaterialQuantityLog.JSONZod";

export const MaterialLogCollectionJSONZod = z.array(MaterialQuantityLogJSONZod);