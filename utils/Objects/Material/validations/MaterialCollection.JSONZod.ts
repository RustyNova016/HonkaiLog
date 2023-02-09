import {z} from "zod";
import {MaterialJSONZod} from "@/utils/Objects/Material/validations/Material.JSONZod";

export const MaterialCollectionJSONZod = z.array(MaterialJSONZod)