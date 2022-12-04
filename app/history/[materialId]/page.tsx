import {z} from "zod";
import {getMaterialLogData} from "./getMaterialLogData";


export default async function Page({params}: any) {
    const parsedParams = z.object({materialId: z.string()}).parse(params)
    const material = await getMaterialLogData(parsedParams.materialId)

    console.log(material)

    return <>Hello</>
}