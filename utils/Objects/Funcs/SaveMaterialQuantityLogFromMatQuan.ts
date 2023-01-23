import {MaterialQuantity} from "../Material/MaterialQuantity";
import axios from "axios";
import {APIRoutes} from "../../../data/API routes";

export async function saveMaterialQuantityLogFromMatQuan(quantity: MaterialQuantity) {
    return await axios.post(APIRoutes.materialLogs, {
        count: quantity.quantity,
        materialId: quantity.material.id
    });
}