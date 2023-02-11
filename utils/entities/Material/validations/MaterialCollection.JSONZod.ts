import {z} from "zod";
import {MaterialJSONZod} from "@/utils/entities/Material/validations/Material.JSONZod";

export const MaterialCollectionJSONZod = z.array(MaterialJSONZod)