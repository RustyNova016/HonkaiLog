import {z} from "zod";
import {MaterialQuantityLogJSONZod} from "@/utils/entities/Material/validations/MaterialQuantityLog.JSONZod";

export const MaterialLogCollectionJSONZod = z.array(MaterialQuantityLogJSONZod);